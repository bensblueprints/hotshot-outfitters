// SEO alt-text mapping. Every image filename → descriptive alt with "Michigan hunting" / "Michigan charter fishing".
// Built mechanically from the renamed staging set so alts and slugs stay in lockstep.

type AltMap = Record<string, string>;

const deerScenes = [
  "Mature Michigan whitetail buck taken on a guided hunt in Huron County",
  "Trophy whitetail deer harvested on a Michigan guided hunting trip in the Thumb",
  "Hunter posing with a Michigan whitetail deer after a guided hunt with Hotshot Outfitters",
  "Whitetail buck downed during Michigan firearm deer season in Port Hope",
  "Michigan hunting client with a heavy-racked whitetail deer in Huron County",
  "Guided Michigan whitetail deer hunt success story in Michigan's Thumb",
  "Field-dressed Michigan whitetail buck from an archery hunt near Port Hope",
  "Michigan hunting outfitter Hotshot Outfitters guided whitetail trophy",
  "Big-bodied Michigan whitetail deer taken in Huron County agriculture country",
  "Michigan deer hunting client kneeling with a guided-hunt whitetail buck",
  "Guided Michigan whitetail hunt result in Huron County woodlots",
  "Michigan firearm deer season success — Port Hope guided hunt",
  "Whitetail buck from a guided Michigan hunting trip with Hotshot Outfitters",
  "Michigan hunting season trophy whitetail in Michigan's Thumb",
  "Guided Michigan whitetail deer hunt photo from Hotshot Outfitters in Port Hope",
];

const turkeyScenes = [
  "Michigan wild turkey gobbler taken on a guided spring hunt in Huron County",
  "Long-bearded Michigan wild turkey from a guided hunt with Hotshot Outfitters",
  "Spring Michigan wild turkey hunting success in Michigan's Thumb",
  "Guided Michigan wild turkey hunt trophy gobbler near Port Hope",
  "Michigan hunting client with a guided-hunt wild turkey in Huron County",
  "Wild turkey decoyed on a Michigan guided hunting trip in the Thumb",
];

const duckScenes = [
  "Michigan duck hunting limit from a Lake Huron marsh guided waterfowl hunt",
  "Mallards and divers taken on a Michigan guided duck hunting trip in Huron County",
  "Michigan duck hunting blind success on a guided waterfowl hunt with Hotshot Outfitters",
];

const gooseScenes = [
  "Michigan Canada goose hunting limit from a guided field hunt in the Thumb",
  "Decoy spread for a Michigan guided goose hunt in Huron County",
  "Michigan goose hunting success — guided Canada goose field hunt near Port Hope",
  "Canada geese taken on a guided Michigan hunting trip with Hotshot Outfitters",
  "Layout blind Michigan goose hunting setup in Huron County grain fields",
  "Michigan hunting client with a guided Canada goose limit in the Thumb",
  "Guided Michigan goose hunting trophy honkers near Port Hope",
  "Field-hunt Michigan Canada goose harvest on a guided waterfowl trip",
  "Michigan goose hunting decoyed flock on a guided hunt with Hotshot Outfitters",
  "Canada goose field hunt result from a Michigan guided hunting outfitter",
  "Michigan Canada goose hunting limit guided trip Huron County",
];

const coyoteScenes = [
  "Michigan coyote hunting predator harvested on a guided calling setup",
  "Michigan predator hunting — coyote taken on a guided hunt in Huron County",
  "Guided Michigan coyote hunting trophy from a calling stand near Port Hope",
  "Michigan hunting client with a guided coyote and fox predator hunt result",
];

const rabbitScenes = [
  "Michigan cottontail rabbit hunting limit from a guided small-game hunt",
  "Guided Michigan cottontail rabbit hunt in Huron County brush cover",
  "Michigan small-game hunting success — cottontail rabbit limit in the Thumb",
  "Cottontail rabbits from a Michigan guided hunting trip with Hotshot Outfitters",
  "Michigan rabbit hunting client with a guided cottontail limit near Port Hope",
  "Guided Michigan cottontail rabbit hunting trophy from a thicket hunt",
  "Michigan small-game hunting limit — guided cottontail rabbit trip",
  "Cottontail rabbit hunt result on a guided Michigan hunting trip",
];

const fishingScenes = [
  "Michigan charter fishing client with a Lake Huron walleye catch",
  "Lake Huron charter fishing trip success out of Port Hope, Michigan",
  "Michigan charter fishing — trophy walleye from Lake Huron's Saginaw Bay area",
  "Guided Lake Huron charter fishing client with a salmon on Michigan's Thumb",
  "Michigan charter fishing trip on Lake Huron with Hotshot Outfitters",
  "Lake Huron charter fishing — Michigan trout caught on a guided trip",
  "Michigan charter fishing client with a Lake Huron catch in Port Hope",
  "Guided Michigan charter fishing trip on Lake Huron with multiple species",
  "Lake Huron charter fishing success on a Michigan guided trip",
  "Michigan charter fishing — Lake Huron catch on a guided trip with Hotshot Outfitters",
];

const alts: AltMap = {
  "hotshot-outfitters-logo.webp": "Hotshot Outfitters logo — Michigan guided hunting and Lake Huron charter fishing outfitter in Port Hope, Michigan",
  "michigan-guided-hunting-hero-tile.webp": "Michigan guided hunting trip with Hotshot Outfitters in Huron County — full-service hunts in Michigan's Thumb",
  "michigan-charter-fishing-hero-tile.webp": "Lake Huron charter fishing trip out of Port Hope, Michigan with Hotshot Outfitters",
  "michigan-hunting-charter-fishing-outfitter-about.webp": "Hotshot Outfitters Michigan hunting and charter fishing guide team in Port Hope, Michigan",
  "michigan-hunting-crow-michigan-01.webp": "Michigan crow hunting wing-shooting on a guided hunt in Huron County with Hotshot Outfitters",
};

deerScenes.forEach((scene, i) => {
  alts[`michigan-hunting-whitetail-deer-michigan-${String(i + 1).padStart(2, "0")}.webp`] = scene;
});
turkeyScenes.forEach((scene, i) => {
  alts[`michigan-hunting-wild-turkey-michigan-${String(i + 1).padStart(2, "0")}.webp`] = scene;
});
duckScenes.forEach((scene, i) => {
  alts[`michigan-hunting-duck-waterfowl-michigan-${String(i + 1).padStart(2, "0")}.webp`] = scene;
});
gooseScenes.forEach((scene, i) => {
  alts[`michigan-hunting-canada-goose-michigan-${String(i + 1).padStart(2, "0")}.webp`] = scene;
});
coyoteScenes.forEach((scene, i) => {
  alts[`michigan-hunting-coyote-fox-predator-michigan-${String(i + 1).padStart(2, "0")}.webp`] = scene;
});
rabbitScenes.forEach((scene, i) => {
  alts[`michigan-hunting-cottontail-rabbit-michigan-${String(i + 1).padStart(2, "0")}.webp`] = scene;
});
fishingScenes.forEach((scene, i) => {
  alts[`michigan-charter-fishing-lake-huron-${String(i + 1).padStart(2, "0")}.webp`] = scene;
});

export function alt(filename: string): string {
  return alts[filename] ?? "Michigan hunting with Hotshot Outfitters";
}

export function huntImages(prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    `${prefix}-${String(i + 1).padStart(2, "0")}.webp`
  );
}
