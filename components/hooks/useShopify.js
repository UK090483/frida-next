import { useState, useContext } from "react"
import shopContext from "~context/shopifyContext"

const defaultProduct = {
  checkoutUrl: "/",
  availability: false,
  inCart: false,
  addToCart: () => {},
  quantity: 1,
  setQuantity: () => {},
  variant: { price: 0 },
  hasOptions: false,
  options: [],
  setOption: () => {},
  selectedOption: () => {},
  images: [],
  imagesArray: [],
  activeImage: "",
  onImageClick: () => {},
  description: "",
  title: "",
  quantityAvailable: 0,
}

export default function useShopify(product = defaultProduct) {
  const { variants, title, options, images, description } = product
  const shop = useContext(shopContext)

  const {
    updateLineItem,
    addVariantToCart,
    store: { client, checkout },
  } = shop

  const [selImage, setSelImage] = useState(null)
  const [selectedOption, setOption] = useState(getInitialOption(variants[0]))
  const [chachedQuantity, setCachedQuantity] = useState(1)
  const [chachedInCart, setChachedInCart] = useState(false)

  const hasOptions = variants.length > 1

  const selectedVariant = client.product.helpers.variantForOptions(
    product,
    selectedOption
  )

  const selectedLineItem = checkout.lineItems.find(
    lineItem => lineItem.variant?.id === selectedVariant.id
  )

  const availability = selectedVariant.availableForSale

  const setQuantity = _quantity => {
    setCachedQuantity(_quantity)
    if (selectedLineItem) {
      updateLineItem(client, checkout.id, selectedLineItem.id, _quantity)
    }
  }

  const addToCart = () => {
    setChachedInCart(true)
    addVariantToCart(selectedVariant.id, chachedQuantity)
  }

  // useEffect(() => {
  //   client.product.fetch(selectedVariant.shopifyId).then(product => {
  //     // Do something with the product
  //     console.log(product)
  //   })
  // }, [client.product, product.shopifyId, selectedVariant.shopifyId])

  const inCart = chachedInCart ? chachedInCart : !!selectedLineItem

  const { imagesArray, activeImage } = getImageArray(
    images,
    selectedVariant,
    selImage
  )

  const onImageClick = i => {
    const _v = variants.find(_variant => {
      return _variant.image.id === i.id
    })

    if (_v) {
      setOption(getInitialOption(_v))
      setSelImage(null)
    } else {
      setOption(getInitialOption(variants[0]))
      setSelImage(i.id)
    }
  }

  return {
    checkoutUrl: checkout.webUrl,
    availability,
    inCart,
    addToCart,
    quantity: selectedLineItem ? selectedLineItem.quantity : chachedQuantity,
    setQuantity,
    variant: selectedVariant,
    hasOptions,
    options,
    setOption,
    selectedOption,
    images,
    imagesArray,
    activeImage,
    onImageClick,
    description,
    title,
  }
}

const getImageArray = (images, selectedVariant, selImage) => {
  const imagesArray = []
  let activeImage = null
  images.forEach(image => {
    const isActive = selImage
      ? selImage === image.id
      : selectedVariant.image.id === image.id

    imagesArray.push({
      src: image.src,
      id: image.id,
      active: isActive,
    })

    if (isActive) {
      activeImage = image
    }
  })
  return { imagesArray, activeImage }
}

const getInitialOption = variant => {
  let res = {}
  variant.selectedOptions.forEach(v => {
    res[v.name] = v.value
  })
  return res
}
