use anchor_lang::prelude::*;

declare_id!("Certi111111111111111111111111111111111111111");

#[program]
pub mod certigrid_program {
    use super::*;

    pub fn register_asset(ctx: Context<RegisterAsset>, asset_id: String, metadata_hash: String) -> Result<()> {
        let asset = &mut ctx.accounts.asset;
        asset.asset_id = asset_id;
        asset.admin_wallet = ctx.accounts.admin.key();
        asset.metadata_hash = metadata_hash;
        asset.created_at = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(asset_id: String)]
pub struct RegisterAsset<'info> {
    #[account(
        init,
        payer = admin,
        space = 8 + EnergyAsset::INIT_SPACE,
        seeds = [b"asset", asset_id.as_bytes()],
        bump
    )]
    pub asset: Account<'info, EnergyAsset>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct EnergyAsset {
    #[max_len(64)]
    pub asset_id: String,
    pub admin_wallet: Pubkey,
    #[max_len(128)]
    pub metadata_hash: String,
    pub created_at: i64,
}
