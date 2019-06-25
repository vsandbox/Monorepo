interface ICharDesc {
  name: string;
  skinId: string;
}
class Character {
  public readonly name: string;
  public readonly skinId: string;

  public constructor(charDesc: ICharDesc) {
    this.name = charDesc.name;
    this.skinId = charDesc.skinId;
  }

  public toString() {
    return this.name;
  }
}

interface ICarDesc {
  name: string;
  skinId: string;
}
class Car {
  public readonly name: string;
  public readonly skinId: string;

  public constructor(carDesc: ICarDesc) {
    this.name = carDesc.name;
    this.skinId = carDesc.skinId;
  }

  public toString() {
    return this.name;
  }
}

interface IGroupDesc {
  name: string;
}
class Group {
  public readonly name: string;

  public constructor(groupDesc: IGroupDesc) {
    this.name = groupDesc.name;
  }

  public toString() {
    return this.name;
  }
}

const persons = {
  Hero: new Character({
    name: "Hero",
    skinId: "Hero"
  }),
  Antihero: new Character({
    name: "Anti-Hero",
    skinId: "Antihero"
  }),
  GunSeller: new Character({
    name: "Gun Seller",
    skinId: "Gun Seller"
  }),
};

const cars = {
};

const groups = {
  BattleTaxi: new Group({
    name: "Battle Taxi",
  }),
  VanTaxi: new Group({
    name: "Van Taxi",
  }),
  CommonTaxi: new Group({
    name: "Common Taxi",
  }),
  Cops: new Group({
    name: "Cops",
  }),
  Bandits: new Group({
    name: "Bandits",
  }),
};

let story = `
${persons.Hero} is the only ${groups.BattleTaxi} member.


Hero is the taxi driver.
Hero delivers guns with gun seller.

# Character crisis
Hero is the best and the only battle taxi. But he is alone. Common taxies work in groups.
So when someone is in trouble the whole group helps.
So Hero will initiate a Battle Taxi at the end with few members.

Hero is the best. He took Gun Seller from the battlefield center.
Van Taxi will.

# The problem
Van Taxi takes more passengers and works in group.



Hero is the only taxi driver.

Antihero makes Hero's life harder.

Hero makes something bad to Antihero.

Hero pays a lot.

Depression.




Hero is good.
Antihero makes bad things.

Maybe Hero explodes Antihero's car with Hero's girl.
Then Hero sells his taxi.
Then sees his taxi with Antihero.

Hero is the only taxi driver. His life is ok. He delivers cops and bandits to the battlefield but never shoots.
Someday he sees like Van takes all cops.

Hero drives with his girl. Then he sees how Van takes cops on the bus station. He drives for the Van but his girl dies from bullet.

1. Introduction
1.1. Call
${persons.Antihero} crashes ${persons.Hero}'s car. ${persons.Hero} should kill him.
1.2. Call Refuse
${persons.Hero} tries to kill ${persons.Antihero} but can't do it. E.g. he sees like ${persons.Antihero} drives poor people.
1.3. Re-Call
${persons.Antihero} makes something horrible. Like takes ${persons.Hero}'s girl.
E.g. ${persons.Hero} goes to "their place". But he sees there like his girl enters ${persons.Antihero}'s car.
1.4. Call Accept
${persons.Hero} explodes ${persons.Antihero}'s car. But ${persons.Antihero} is alive.
`;

story = `
Hero delivers all sides to battlefield.
But then new Deliver Service is initiated.
Hero fights against this new service.

Maybe to solve the problem Hero and Anti-Hero will have an agreement. Hero delivers one side, Anti-Hero another one.

So there could be additional story about the guy who try to join both of them in a single hub.

Because Hero was the only battle driver fights were often delayed. Bandits waits for cops and wise versa.

Common taxi delivers warriors not very close to fight scene.

-- maybe
[Common Taxi driver] Hero is a Common Taxi driver. He delivers cops and bandits near fight scenes.
[Bravest One] He is the most brave one. He delivers cops and bandits very near to fight scenes.
[Alone] But he is alone. Other drivers join to groups.
[Wants family] He wants to have a family.
As he is alone in his world, he leaves Common Taxi and initiates Battle Taxi.
The only Battle Taxi that able to deliver or evacuate to/from the fight center.

# Call
First call is when Hero sees that he could take men just from the center of the fight.

# Call Reject
Hero drives closer, client is running to him. Bullets are in the air. Client is still quite far.
Hero flies because battlefield becomes too hot.
As Hero fails, he returned to Common Taxi.

# Re-Call
Hero sees as his friend, Bicycle-Man goes in the attack

# Hero
${persons.Hero} is the only battle taxi. He is single.

## Why ${persons.Hero} is good
${persons.Hero} evacuates ${persons.GunSeller} from the fight. ${persons.GunSeller} owes ${persons.Hero} his life.

## Whey ${persons.Hero} is better than ${groups.VanTaxi}
When ${persons.GunSeller} chooses ${groups.VanTaxi}'s side against ${persons.Hero} because ${groups.VanTaxi} is bigger and he can deliver more guns for more groups, he calls ${groups.VanTaxi} for evacuation.
But ${groups.VanTaxi} fails.
[Note] That's why ${persons.GunSeller} chooses ${persons.Hero}'s side and joins ${groups.BattleTaxi} at the Final.

# Introduction
${persons.Hero} delivers ${groups.Cops} and ${groups.Bandits} to the same battlefield. Anytime, anywhere. He evacuates from the battlefield, looses ${groups.Cops}'s tail, delivers or evacuates from the back of enemy without being spotted.

## Hero's problem
${persons.Hero} is alone. Cabs from ${groups.CommonTaxi} work in groups. If someone of them in trouble all of them response to enemy.

# Final
${persons.Hero} initiates a ${groups.BattleTaxi} group. There are two members: he and ${persons.GunSeller}.
So now they monopolize battle service. And ${groups.VanTaxi} has a very serious enemy now, because ${groups.BattleTaxi} has guns and driving experience.

${groups.VanTaxi} goes to ${persons.GunSeller} to buy guns. But ${persons.GunSeller} shows a middle finger.

`;

story = `
# Intro
Two guys left in the group try to evacuate. They call
`;

story = `
Hero is the best Driver ever.
Hero has old taxi car. It's not very good to evacuate people from the battlefield.
He makes the new one - Van Taxi. It's bigger and armored. Now, he is the best in evacuation.
Hero wants to big city. He tries to pass block-post in his new Van, as he saw that only big cars passes the border.
He is successfully did it, but few moments later soldiers take his car and put him back.
He comes back home and gets drunk. Then enter his old taxi car and goes to the bus stop. Exit the taxi and go to the city by bus.

When hero orders mechanic to build Van Taxi, mechanic steels the Van from Girl.
Then Girl sees this car and think Hero stole it. That's why Girl left and went to big city.

Each hero could be Neutral, Excited, Sad, Scared.
Hero's secret could be Hidden or Unhidden. Hidden is when hero thinks nobody knows, Unhidden otherwise.

When hero's secret becomes Unhidden he becomes to try to escape.

Each hero lives well until his secret is Open.
Each hero has a price to do something. So, if Hero likes money and there is some option with money - he chooses it.

# Secret:Closed
Hero does something according to his abilities and needs.

# Secret:Open
Hero tries to fix the problem. If it's ok for him, he will kill witness.

--
Fix Secret.
- Critical?
  - Yes: Go to Secret:Critical mode.
  - No: Kill witnesses, flee etc


`;

console.log("\n------------------------------------------------------");
console.log(story);
