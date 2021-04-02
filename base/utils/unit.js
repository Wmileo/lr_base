let units = {
  price: '元',
  upperPrice: '元/㎡',
  lowerPrice: '元/㎡',
  avgPrice: '元/㎡',
  totalPrice: '万/套',
  roomTotalPrice: '元',
  floorSpace: '㎡',
  floorArea: '㎡',
  buildArea: '㎡',
  planningRooms: '户',
  ownershipYears: '年',
  greenRate: '%',
  roomRate: '%',
  propertyFee: '元/㎡/月',
  floorHeight: 'm',
  totalRooms: '套',
}

function get(key) {
  return units[key] || ''
}

if (!$utils) {
  $utils = {}
}

$utils.unit = get

function init(Vue) {
  Vue.prototype._unit = get
}

export default {
  init
}