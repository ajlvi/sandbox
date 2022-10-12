export interface CardQueryData {
    sets: string[],
    decks: string[][],
    card_info: CardInfoData
  }

export interface CardInfoData {
    mana_value: number,
    color: string,
    rarity: string,
    card_type: string,
    subtypes: string
  }