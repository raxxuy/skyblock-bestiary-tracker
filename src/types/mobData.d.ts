export type MobAliases = Record<string, MobAlias>;

export type MobAlias = {
  name: string;
  family: string;
};

export type FamilyData = {
  name: string;
  category: boolean;
  mobs: Record<string, MobData>;
};

export type MobData = {
  name: string;
  bracket: number;
  tier: number;
  kills: number;
}