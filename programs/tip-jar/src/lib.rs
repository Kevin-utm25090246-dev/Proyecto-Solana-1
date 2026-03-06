use anchor_lang::prelude::*;

declare_id!("Cy9Np6urmBXUTeYRzH1WdpMAGC8mGw2RwmE5RPbQ5MkW");

#[program]
pub mod tip_jar {
    use super::*;

    // Inicializa el cofre
    pub fn initialize(ctx: Context<Initialize>, description: String) -> Result<()> {
        let jar = &mut ctx.accounts.jar;
        jar.owner = *ctx.accounts.user.key;
        jar.description = description;
        jar.total_tips = 0;
        Ok(())
    }

    // Función para dar una propina
    pub fn tip(ctx: Context<Tip>, amount: u64) -> Result<()> {
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.user.key(),
            &ctx.accounts.jar.key(),
            amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.jar.to_account_info(),
            ],
        )?;

        ctx.accounts.jar.total_tips += amount;
        msg!("¡Propina recibida! Total ahora: {}", ctx.accounts.jar.total_tips);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 32 + 100 + 8)]
    pub jar: Account<'info, Jar>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Tip<'info> {
    #[account(mut)]
    pub jar: Account<'info, Jar>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Jar {
    pub owner: Pubkey,      // 32 bytes
    pub description: String, // ~100 bytes
    pub total_tips: u64,    // 8 bytes
}