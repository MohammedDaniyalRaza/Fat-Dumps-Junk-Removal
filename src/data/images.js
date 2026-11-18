/** @type {Record<string, { url: string; alt: string; focalPoint: string; orientation: string }>} */
export const images = {
  heroTruck: {
    url: '/src/assets/images/hero_hauling_truck_1795042887178.jpg',
    alt: 'White commercial dump truck with black dump bed parked on a sunlit North County San Diego residential driveway',
    focalPoint: '55% 60%',
    orientation: 'landscape',
  },
  emptyLivingRoom: {
    url: '/src/assets/images/service_residential_cleanout_1795042887988.jpg',
    alt: 'Freshly cleared and swept Southern California living room flooded with afternoon sunlight',
    focalPoint: '50% 55%',
    orientation: 'landscape',
  },
  clutteredLivingRoom: {
    url: '/src/assets/images/service_furniture_removal_1795042887725.jpg',
    alt: 'Residential room packed with an old leather sofa, wooden dresser, and stacked boxes ready for hauling',
    focalPoint: '50% 55%',
    orientation: 'landscape',
  },
  clutteredGarage: {
    url: '/src/assets/images/service_garage_cleanout_1795042888386.jpg',
    alt: 'Two-car suburban garage filled with stacked boxes, old bikes, and broken patio furniture ready for cleanout',
    focalPoint: '50% 55%',
    orientation: 'landscape',
  },
  cleanGarage: {
    url: '/src/assets/images/clean_empty_garage_1795042889498.jpg',
    alt: 'Clean freshly swept empty suburban garage with smooth concrete floor and open driveway light',
    focalPoint: '50% 55%',
    orientation: 'landscape',
  },
  appliancesPickup: {
    url: '/src/assets/images/appliances_hauling_1795042889251.jpg',
    alt: 'Used stainless steel refrigerator, washer, and dryer lined up on a residential driveway for appliance removal',
    focalPoint: '50% 55%',
    orientation: 'landscape',
  },
  yardDebris: {
    url: '/src/assets/images/yard_debris_pickup_1795042890270.jpg',
    alt: 'Pile of trimmed palm fronds, tree branches, and contractor bags ready for yard debris pickup in San Diego',
    focalPoint: '50% 55%',
    orientation: 'landscape',
  },
  coastalNorthCounty: {
    url: '/src/assets/images/coastal_north_county_1795042890572.jpg',
    alt: 'Coastal North County San Diego hillside neighborhoods and ocean horizon at golden hour',
    focalPoint: '50% 50%',
    orientation: 'landscape',
  },
  mattressAndChair: {
    url: '/src/assets/images/mattress_couch_haul_1795042890885.jpg',
    alt: 'Old mattress, box spring, and worn upholstered armchair placed near a driveway for haul-away',
    focalPoint: '50% 58%',
    orientation: 'landscape',
  },
  renovationDebris: {
    url: '/src/assets/images/renovation_debris_1795042891373.jpg',
    alt: 'Home remodel debris including old wood cabinets, scrap lumber, broken tile, and heavy trash bags',
    focalPoint: '50% 55%',
    orientation: 'landscape',
  },
};

export function getThumb(url) {
  return url;
}

export function getFull(url) {
  return url;
}
