console.log('📝 Generating Data...')

// Tu ones are commented out because they're not working
const urls = [
  //   ['https://www.argos.co.uk/list/shop-for-kids-new-in-at-argos?tag=ar:features:new-in:tukids', 'tu-kids-1'],
  //   ['https://www.argos.co.uk/list/shop-for-kids-new-in-at-argos/opt/page:2/', 'tu-kids-2'],
  //   ['https://www.argos.co.uk/list/shop-for-mens-new-in-at-argos?tag=ar:features:new-in:tumens', 'tu-mens-1'],
  //   ['https://www.argos.co.uk/list/shop-for-mens-new-in-at-argos/opt/page:2', 'tu-mens-2'],
  //   ['https://www.argos.co.uk/list/shop-for-womens-new-in-at-argos?tag=ar:features:new-in:tuwomens', 'tu-womens-1'],
  //   ['https://www.argos.co.uk/list/shop-for-womens-new-in-at-argos/opt/page:2/', 'tu-womens-2'],
  ['https://www.argos.co.uk/search/shop-all-new-products/opt/page:1/', 'new-products-1'],
  ['https://www.argos.co.uk/search/shop-all-new-products/opt/page:2/', 'new-products-2'],
  ['https://www.argos.co.uk/search/shop-all-new-products/opt/page:3/', 'new-products-3'],
  ['https://www.argos.co.uk/clearance/toys/c:30299/?tag=ar:events:clearance:toys', 'clearance-toys'],
  ['https://www.argos.co.uk/clearance/technology/c:29949/?tag=ar:event:technology-offers:clearance', 'clearance-technology'],
  ['https://www.argos.co.uk/clearance/appliances/c:787124/?tag=ar:events:clearance:appliances', 'clearance-appliances'],
  ['https://www.argos.co.uk/clearance/sports-and-leisure/c:30468/?tag=ar:events:clearance:sportsleisure', 'clearance-sportsleisure'],
  ['https://www.argos.co.uk/clearance/garden-and-diy/c:797660/?tag=ar:events:clearance:garden-and-diy', 'clearance-garden-and-diy'],
  ['https://www.argos.co.uk/clearance/home-and-furniture/c:29351/?tag=ar:events:clearance:home-and-furniture', 'clearance-home-and-furniture'],
  ['https://www.argos.co.uk/clearance/baby-and-nursery/c:29000/?tag=ar:events:clearance:babynursery', 'clearance-babynursery'],
  ['https://www.argos.co.uk/clearance/health-and-beauty/c:29203/?tag=ar:events:clearance:healthbeauty', 'clearance-healthbeauty'],
  ['https://www.argos.co.uk/clearance/jewellery-and-watches/c:29298/?tag=ar:events:clearance:jewellery', 'clearance-jewellery'],
]

urls.forEach(async ([url, key]) => {
  try {
    const res = await fetch(url)
    const html = await res.text()

    const titlePattern = /<div\s[^>]*data-test=['"]component-product-card-title['"][^>]*>.*?<\/div>/g
    const pricePattern = /<div\s[^>]*data-test=['"]component-product-card-price['"][^>]*>.*?<\/div>/g
    const skuPattern = /<a\s[^>]*data-test=['"]component-product-card-link['"][^>]*>.*?<\/a>/g

    const titles = html.match(titlePattern)
    const prices = html.match(pricePattern)
    const skus = html.match(skuPattern)

    const data = titles.map((titleHTML, i) => {
      const price = prices[i].match(/<strong>£(.+)<\/strong>/)[1]
      const sku = skus[i].match(/\/product\/([\d]+)\?/)[1]
      const title = titleHTML.match(/>(.+)</)[1]
      return { title, price, sku }
    })

    await Bun.write(`./src/data/${key}.js`, 'export const data = ' + JSON.stringify(data))
    console.log(`✅ ${key}.js`)
  } catch (e) {
    console.log(`🔥 ${key}.js`)
    console.log(e)
  }
})
