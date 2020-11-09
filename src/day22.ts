import {loadInput} from "./utils";

interface Boss {
  damage: number
  hp: number
}

interface Player {
  mana: number
  hp: number
  armor: number
}

interface Effect {
  name: string
  turns: number
  damage: number
  manna: number
  armor: number
  cost: number
}

interface Attack {
  name: string
  cost: number
  damage: number
  hp: number
}

function parseBoss(lines: string[]) {
  const boss: Boss = {damage: -1, hp: -1}
  lines.forEach(l => {
    const tokens = l.split(': ')
    if (tokens[0] === 'Hit Points') {
      boss.hp = parseInt(tokens[1])
    }
    if (tokens[0] === 'Damage') {
      boss.damage = parseInt(tokens[1])
    }
  })

  return boss
}


const magicMissile: Attack = {name: 'Magic Missile', cost: 53, damage: 4, hp: 0}
const drain: Attack = {name: 'Drain', cost: 73, damage: 2, hp: 2}


const shield: Effect = {name: 'Shield', turns: 6, damage: 0, manna: 0, armor: 7, cost: 113}
const poison: Effect = {name: 'Poison', turns: 6, damage: 3, manna: 0, armor: 0, cost: 173}
const recharge: Effect = {name: 'Recharge', turns: 5, damage: 0, manna: 101, armor: 0, cost: 229}

interface State {
  activeEffects: Effect[]
  player: Player
  boss: Boss
  mannaSpent: number
  playerTurn: boolean,
  hardMode: boolean
}

export function solve(player: Player, boss: Boss, hardMode: boolean) {
  const startingState = {
    activeEffects: [],
    player: {...player},
    boss: {...boss},
    mannaSpent: 0,
    playerTurn: true,
    hardMode: hardMode
  }

  return step(startingState, 0, deadEnd)
}

function cloneState(state: State): State {
  const ae = state.activeEffects.map(e => {
    return {...e}
  });

  return {
    activeEffects: ae,
    player: {...state.player},
    boss: {...state.boss},
    mannaSpent: state.mannaSpent,
    playerTurn: state.playerTurn,
    hardMode: state.hardMode
  }
}

const deadEnd = 1000000

function step(state: State, depth: number, cheapestMana: number): number {
  if (depth > 100) {
    // console.log(" >> Depth dead end")
    return deadEnd
  }

  if (state.mannaSpent > cheapestMana) {
    // console.log(" >> This path is more expensive")
    return deadEnd
  }

  // console.log(state.playerTurn ? "-- Player Turn --" : "-- Boss Turn --");
  // console.log(`- Player has ${state.player.hp}, ${state.player.mana}`)
  // console.log(`- Player effects active: ${state.activeEffects.map(e => e.name)}`)
  // console.log(`- Boss has ${state.boss.hp}`)


  const currentState = cloneState(state);

  if (currentState.hardMode && currentState.playerTurn) {
    currentState.player.hp -= 1
    if (currentState.player.hp <= 0) {
      return deadEnd
    }
  }

  // Apply active effects
  for (const effect of currentState.activeEffects) {
    // console.log(`Effect ${effect.name} active`);
    currentState.player.mana += effect.manna;
    // console.log(`Provides ${effect.manna} mana`);
    currentState.boss.hp -= effect.damage;
    // console.log(`Deals ${effect.damage} damage`);
    // Decrement effect counters
    effect.turns -= 1;
    // console.log(`Counter: ${effect.turns}`);
  }

  // Remove any effects that have expired
  currentState.activeEffects = currentState.activeEffects.filter(e => e.turns > 0)

  // I win, how much did it cost?
  if (currentState.boss.hp <= 0) {
    return currentState.mannaSpent
  }

  // Someone's turn
  if (currentState.playerTurn) {
    currentState.playerTurn = false

    // magic missile
    const magicMissileMana = castMagicMissile(currentState, depth, cheapestMana)
    // const magicMissileMana = deadEnd
    // drain
    const drainMana = castDrain(currentState, depth, Math.min(magicMissileMana, cheapestMana))
    // const drainMana = deadEnd
    // shield
    const shieldMana = castShield(currentState, depth, Math.min(magicMissileMana, cheapestMana, drainMana))
    // const shieldMana = deadEnd
    // poison
    const poisonMana = castPoison(currentState, depth, Math.min(magicMissileMana, cheapestMana, drainMana, shieldMana))
    // const poisonMana = deadEnd
    // recharge
    const rechargeMana = castRecharge(currentState, depth, Math.min(magicMissileMana, cheapestMana, drainMana, shieldMana, poisonMana))
    // const rechargeMana = deadEnd

    return Math.min(magicMissileMana, drainMana, shieldMana, poisonMana, rechargeMana)
  } else {
    const shields: Effect[] = currentState.activeEffects.filter(e => e.name === 'Shield')
    const activeShield = shields.length > 0 ? shields[0] : null

    const netDamage = activeShield ? Math.max(currentState.boss.damage - activeShield.armor, 1) : currentState.boss.damage

    // I lost, return null since this is a dead end
    currentState.player.hp -= netDamage
    if (currentState.player.hp <= 0) {
      return deadEnd
    }
    // If I'm not dead, keep going
    currentState.playerTurn = true;
    return step(currentState, depth + 1, cheapestMana);
  }
}

function castMagicMissile(state: State, depth: number, cheapestMana: number): number {
  if (state.player.mana < magicMissile.cost) {
    return deadEnd
  }

  const currentState = cloneState(state)
  currentState.player.mana -= magicMissile.cost
  currentState.mannaSpent += magicMissile.cost
  currentState.boss.hp -= magicMissile.damage

  if (currentState.boss.hp <= 0) {
    return currentState.mannaSpent
  }

  return step(currentState, depth + 1, cheapestMana)
}

function castDrain(state: State, depth: number, cheapestMana: number): number {
  if (state.player.mana < drain.cost) {
    return deadEnd
  }

  const currentState = cloneState(state)
  currentState.player.mana -= drain.cost
  currentState.mannaSpent += drain.cost
  currentState.boss.hp -= drain.damage
  currentState.player.hp += drain.hp

  if (currentState.boss.hp <= 0) {
    return currentState.mannaSpent
  }

  return step(currentState, depth + 1, cheapestMana)
}


function castShield(state: State, depth: number, cheapestMana: number): number {
  if (state.player.mana < shield.cost) {
    return deadEnd
  }
  if (state.activeEffects.filter(e => e.name === shield.name).length > 0) {
    return deadEnd
  }

  const currentState = cloneState(state)
  currentState.player.mana -= shield.cost
  currentState.mannaSpent += shield.cost
  currentState.activeEffects.push(shield)

  return step(currentState, depth + 1, cheapestMana)
}

function castPoison(state: State, depth: number, cheapestMana: number): number {
  if (state.player.mana < poison.cost) {
    return deadEnd
  }
  if (state.activeEffects.filter(e => e.name === poison.name).length > 0) {
    return deadEnd
  }

  const currentState = cloneState(state)
  currentState.player.mana -= poison.cost
  currentState.mannaSpent += poison.cost
  currentState.activeEffects.push(poison)

  return step(currentState, depth + 1, cheapestMana)
}

function castRecharge(state: State, depth: number, cheapestMana: number): number {
  if (state.player.mana < recharge.cost) {
    return deadEnd
  }
  if (state.activeEffects.filter(e => e.name === recharge.name).length > 0) {
    return deadEnd
  }

  const currentState = cloneState(state)
  currentState.player.mana -= recharge.cost
  currentState.mannaSpent += recharge.cost
  currentState.activeEffects.push(recharge)

  return step(currentState, depth + 1, cheapestMana)
}

if (require.main === module) {
  const lines = loadInput(22).filter((l) => l != "");
  const boss = parseBoss(lines)
  const player = {mana: 500, hp: 50, armor: 0}
  console.log(`Part 1, min cost: ${solve(player, boss, false)}`)
  console.log(`Part 2, min cost: ${solve(player, boss, true)}`)
  // 971 is too high
  // console.log(`Part 2, max cost: ${part2(boss)}`)
}
