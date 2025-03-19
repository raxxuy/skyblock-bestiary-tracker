export type MobAliases = Record<string, MobAlias>;

export type MobAlias = {
  name: string;
  category: string;
};

export type FamilyData = {
  name: string;
  subcategory: boolean;
  mobs: Record<string, MobData>;
};

export type MobData = {
  name: string;
  bracket: number;
  tier: number;
  kills: number;
}