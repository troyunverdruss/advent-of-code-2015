import {loadInput} from "./utils";

interface Item {
  name: string
  cost: number
  damage: number
  armor: number
}

const weapons: Item[] = [
  {name: 'Dagger', cost: 8, damage: 4, armor: 0},
  {name: 'Shortsword', cost: 10, damage: 5, armor: 0},
  {name: 'Warhammer', cost: 25, damage: 6, armor: 0},
  {name: 'Longsword', cost: 40, damage: 7, armor: 0},
  {name: 'Greataxe', cost: 74, damage: 8, armor: 0},
]

const armors: Item[] = [
  {name: 'Leather', cost: 13, damage: 0, armor: 1},
  {name: 'Chainmail', cost: 31, damage: 0, armor: 2},
  {name: 'Splintmail', cost: 53, damage: 0, armor: 3},
  {name: 'Bandedmail', cost: 75, damage: 0, armor: 4},
  {name: 'Platemail', cost: 102, damage: 0, armor: 5},
]

const rings: Item[] = [
  {name: 'Damage +1', cost: 25, damage: 1, armor: 0},
  {name: 'Damage +2', cost: 50, damage: 2, armor: 0},
  {name: 'Damage +3', cost: 100, damage: 3, armor: 0},
  {name: 'Defense +1', cost: 20, damage: 0, armor: 1},
  {name: 'Defense +2', cost: 40, damage: 0, armor: 2},
  {name: 'Defense +3', cost: 80, damage: 0, armor: 3},
]

const noneItem: Item = {name: 'none', cost: 0, damage: 0, armor: 0}


interface Person {
  damage: number
  armor: number
  hp: number
}

function parseEnemy(lines: string[]) {
  const enemy: Person = {damage: -1, armor: -1, hp: -1}
  lines.forEach(l => {
    const tokens = l.split(': ')
    if (tokens[0] === 'Hit Points') {
      enemy.hp = parseInt(tokens[1])
    }
    if (tokens[0] === 'Damage') {
      enemy.damage = parseInt(tokens[1])
    }
    if (tokens[0] === 'Armor') {
      enemy.armor = parseInt(tokens[1])
    }
  })

  return enemy
}

export function part1(enemy: Person) {
  const combos = getAllCombos(CostPref.LOWEST)
  for (const mySetup of combos) {
    const myNetDamage = Math.max(mySetup.damage - enemy.armor, 1)
    const enemyNetDamage = Math.max(enemy.damage - mySetup.armor, 1)
    for (let round = 1; round < 1000; round++) {
      if (myNetDamage * round >= enemy.hp) {
        console.log(`I win with ${itemToStr(mySetup)}`);
        return mySetup.cost
      }
      if (enemyNetDamage * round >= 100) {
        // console.log(`enemy wins with ${itemToStr(mySetup)}`);
        break
      }
    }
  }

  throw Error('i never won?')
}

export function part2(enemy: Person) {
  const combos = getAllCombos(CostPref.HIGHEST)
  for (const mySetup of combos) {
    const myNetDamage = Math.max(mySetup.damage - enemy.armor, 1)
    const enemyNetDamage = Math.max(enemy.damage - mySetup.armor, 1)
    for (let round = 1; round < 1000; round++) {
      if (myNetDamage * round >= enemy.hp) {
        // console.log(`I win with ${itemToStr(mySetup)}`);
        break
      }
      if (enemyNetDamage * round >= 100) {
        console.log(`enemy wins with ${itemToStr(mySetup)}`);
        return mySetup.cost
      }
    }
  }

  throw Error('i never lost?')
}

enum CostPref {
  LOWEST, HIGHEST
}

function getAllCombos(prefer: CostPref): Item[] {
  const combos = new Map<string, Item>()
  for (const weapon of weapons) {
    for (const armor of armors.concat([noneItem])) {
      for (const ring of getRingCombos().concat([noneItem])) {
        const newItem: Item = {
          name: `${weapon.name} ${armor.name} ${ring.name}`,
          cost: weapon.cost + armor.cost + ring.cost,
          damage: weapon.damage + armor.damage + ring.damage,
          armor: weapon.armor + armor.armor + ring.armor,
        }

        const valStr = itemValToStr(newItem)
        if (!combos.has(valStr)) {
          combos.set(valStr, newItem)
        } else {
          const existingItemCost = combos.get(valStr)?.cost
          if (existingItemCost === undefined) {
            throw Error('oops')
          }
          switch (prefer) {
            case CostPref.LOWEST:
              if (newItem.cost < existingItemCost) {
                combos.set(valStr, newItem)
              }
              break;
            case CostPref.HIGHEST:
              if (newItem.cost > existingItemCost) {
                combos.set(valStr, newItem)
              }
              break;
            default:
              throw Error('uh oh')
          }

        }
      }
    }
  }
  return [...combos.values()].sort((a, b) => {
    return prefer === CostPref.HIGHEST ? b.cost - a.cost : a.cost - b.cost
  })
}

function itemValToStr(item: Item) {
  return `${item.damage} ${item.armor}`
}

function itemToStr(item: Item) {
  return `'${item.name}' c:${item.cost} d:${item.damage} a:${item.armor}`
}

function getRingCombos(): Item[] {
  const groupedRings = []
  for (const ring1 of rings.concat([noneItem])) {
    for (const ring2 of rings.concat([noneItem])) {
      if (ring1.name === ring2.name) {
        continue;
      }

      const newItem: Item = {
        name: `${ring1.name} ${ring2.name}`,
        cost: ring1.cost + ring2.cost,
        damage: ring1.damage + ring2.damage,
        armor: ring1.armor + ring2.armor
      };
      groupedRings.push(newItem)
    }
  }
  return groupedRings;
}

if (require.main === module) {
  const lines = loadInput(21).filter((l) => l != "");
  const enemy = parseEnemy(lines)
  console.log(`Part 1, min cost: ${part1(enemy)}`)
  console.log(`Part 2, max cost: ${part2(enemy)}`)
}
