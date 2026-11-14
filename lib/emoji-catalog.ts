import type { EmojiItem } from "../primitives/emoji-picker";

type EmojiCategory = {
  value: string;
  label: string;
  icon: string;
  items: EmojiItem[];
};

const smileys: EmojiItem[] = [
  { value: "😀", label: "Grinning" },
  { value: "🔥", label: "Fire" },
  { value: "😃", label: "Grinning big eyes" },
  { value: "😄", label: "Grinning squinting" },
  { value: "😁", label: "Beaming" },
  { value: "😆", label: "Squinting" },
  { value: "😅", label: "Sweat smile" },
  { value: "😂", label: "Joy" },
  { value: "🤣", label: "Rolling on the floor" },
  { value: "🥲", label: "Tear smile" },
  { value: "☺️", label: "Smiling" },
  { value: "😊", label: "Smiling eyes" },
  { value: "😉", label: "Winking" },
  { value: "😇", label: "Halo" },
  { value: "🙂", label: "Slight smile" },
  { value: "😍", label: "Heart eyes" },
  { value: "🥰", label: "Smiling hearts" },
  { value: "🤩", label: "Star eyes" },
  { value: "😘", label: "Blowing a kiss" },
  { value: "😗", label: "Kissing" },
  { value: "😚", label: "Kissing closed eyes" },
  { value: "😙", label: "Kissing smiling eyes" },
  { value: "😋", label: "Savoring" },
  { value: "😛", label: "Tongue" },
  { value: "😜", label: "Winking tongue" },
  { value: "🤪", label: "Zany" },
  { value: "😝", label: "Squinting tongue" },
  { value: "🤑", label: "Money mouth" },
  { value: "🤗", label: "Hugging" },
  { value: "🤭", label: "Hand over mouth" },
  { value: "🫢", label: "Eyes open hand over mouth" },
  { value: "🫣", label: "Peeking" },
  { value: "🤫", label: "Shushing" },
  { value: "🤔", label: "Think" },
  { value: "🫡", label: "Saluting" },
  { value: "🤐", label: "Zipper mouth" },
  { value: "🤨", label: "Raised eyebrow" },
  { value: "😐", label: "Neutral" },
  { value: "😑", label: "Expressionless" },
  { value: "😶", label: "No mouth" },
  { value: "🫥", label: "Dotted line" },
  { value: "😏", label: "Smirk" },
  { value: "😒", label: "Unamused" },
  { value: "🙄", label: "Rolling eyes" },
  { value: "😬", label: "Grimacing" },
  { value: "😮‍💨", label: "Exhale" },
  { value: "😌", label: "Relieved" },
  { value: "😔", label: "Pensive" },
  { value: "😢", label: "Sad" },
  { value: "😞", label: "Disappointed" },
  { value: "☹️", label: "Frowning" },
  { value: "😪", label: "Sleepy" },
  { value: "🤤", label: "Drooling" },
  { value: "😴", label: "Sleeping" },
];

const people: EmojiItem[] = [
  { value: "👋", label: "Waving" },
  { value: "👍", label: "Thumbs up" },
  { value: "👎", label: "Thumbs down" },
  { value: "👏", label: "Clap" },
  { value: "🙌", label: "Raised hands" },
  { value: "🤝", label: "Handshake" },
  { value: "🙏", label: "Folded hands" },
  { value: "💪", label: "Flexed biceps" },
  { value: "🫶", label: "Heart hands" },
  { value: "✌️", label: "Victory" },
  { value: "🤞", label: "Crossed fingers" },
  { value: "🫰", label: "Heart finger" },
];

const animals: EmojiItem[] = [
  { value: "🐶", label: "Dog" },
  { value: "🐱", label: "Cat" },
  { value: "🐭", label: "Mouse" },
  { value: "🐹", label: "Hamster" },
  { value: "🐰", label: "Rabbit" },
  { value: "🦊", label: "Fox" },
  { value: "🐻", label: "Bear" },
  { value: "🐼", label: "Panda" },
  { value: "🐨", label: "Koala" },
  { value: "🐯", label: "Tiger" },
  { value: "🦁", label: "Lion" },
  { value: "🐮", label: "Cow" },
];

const food: EmojiItem[] = [
  { value: "🍎", label: "Apple" },
  { value: "🍐", label: "Pear" },
  { value: "🍊", label: "Tangerine" },
  { value: "🍋", label: "Lemon" },
  { value: "🍌", label: "Banana" },
  { value: "🍉", label: "Watermelon" },
  { value: "🍇", label: "Grapes" },
  { value: "🍓", label: "Strawberry" },
  { value: "🫐", label: "Blueberries" },
  { value: "🍑", label: "Peach" },
  { value: "🍕", label: "Pizza" },
  { value: "🍔", label: "Hamburger" },
];

const activity: EmojiItem[] = [
  { value: "⚽", label: "Soccer" },
  { value: "🏀", label: "Basketball" },
  { value: "🏈", label: "Football" },
  { value: "⚾", label: "Baseball" },
  { value: "🎾", label: "Tennis" },
  { value: "🏐", label: "Volleyball" },
  { value: "🎱", label: "Pool 8 ball" },
  { value: "🏓", label: "Ping pong" },
  { value: "🎯", label: "Bullseye" },
  { value: "🎮", label: "Video game" },
  { value: "🎲", label: "Dice" },
  { value: "🏆", label: "Trophy" },
];

const travel: EmojiItem[] = [
  { value: "🚗", label: "Car" },
  { value: "🚕", label: "Taxi" },
  { value: "🚌", label: "Bus" },
  { value: "🚎", label: "Trolleybus" },
  { value: "🏎️", label: "Racing car" },
  { value: "🚓", label: "Police car" },
  { value: "🚑", label: "Ambulance" },
  { value: "🚒", label: "Fire engine" },
  { value: "✈️", label: "Airplane" },
  { value: "🚀", label: "Rocket" },
  { value: "🛸", label: "Flying saucer" },
  { value: "🚢", label: "Ship" },
];

const objects: EmojiItem[] = [
  { value: "💡", label: "Light bulb" },
  { value: "🔦", label: "Flashlight" },
  { value: "📒", label: "Notebook" },
  { value: "📚", label: "Books" },
  { value: "💻", label: "Laptop" },
  { value: "📱", label: "Phone" },
  { value: "⌚️", label: "Watch" },
  { value: "📷", label: "Camera" },
  { value: "🔑", label: "Key" },
  { value: "💰", label: "Money bag" },
  { value: "🎁", label: "Gift" },
  { value: "📦", label: "Package" },
];

const symbols: EmojiItem[] = [
  { value: "❤️", label: "Heart" },
  { value: "🧡", label: "Orange heart" },
  { value: "💛", label: "Yellow heart" },
  { value: "💚", label: "Green heart" },
  { value: "💙", label: "Blue heart" },
  { value: "💜", label: "Purple heart" },
  { value: "✨", label: "Sparkles" },
  { value: "⭐", label: "Star" },
  { value: "🎉", label: "Party" },
  { value: "✅", label: "Check mark" },
  { value: "❌", label: "Cross mark" },
  { value: "💯", label: "Hundred" },
];

const flags: EmojiItem[] = [
  { value: "🏁", label: "Chequered flag" },
  { value: "🚩", label: "Triangular flag" },
  { value: "🎌", label: "Crossed flags" },
  { value: "🏴", label: "Black flag" },
  { value: "🏳️", label: "White flag" },
  { value: "🌈", label: "Rainbow" },
];

const categories: EmojiCategory[] = [
  { value: "recents", label: "Recents", icon: "🕒", items: smileys.slice(0, 12) },
  { value: "smileys", label: "Smileys", icon: "😊", items: smileys },
  { value: "people", label: "Gestures", icon: "👋", items: people },
  { value: "animals", label: "Animals", icon: "🐾", items: animals },
  { value: "food", label: "Food", icon: "🍎", items: food },
  { value: "activity", label: "Activity", icon: "⚽", items: activity },
  { value: "travel", label: "Travel", icon: "🚗", items: travel },
  { value: "objects", label: "Objects", icon: "💡", items: objects },
  { value: "symbols", label: "Symbols", icon: "🎵", items: symbols },
  { value: "flags", label: "Flags", icon: "🏁", items: flags },
];

const allItems = categories.flatMap((category) =>
  category.value === "recents" ? [] : category.items,
);

function rowsOf(items: EmojiItem[], columns: number) {
  const rows: EmojiItem[][] = [];
  for (let index = 0; index < items.length; index += columns) {
    rows.push(items.slice(index, index + columns));
  }
  return rows;
}

function itemsFor(category: string, query: string): EmojiItem[] {
  const needle = query.trim().toLowerCase();
  const pool = needle
    ? allItems
    : (categories.find((entry) => entry.value === category)?.items ?? smileys);
  if (!needle) return pool;
  return pool.filter(
    (item) =>
      item.label.toLowerCase().includes(needle) || item.value.includes(needle),
  );
}

export { categories, itemsFor, rowsOf, type EmojiCategory };
