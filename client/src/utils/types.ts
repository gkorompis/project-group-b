//CustomizedButtonProps

export interface CustomizedButtonProps {
  componentColor: {
    bgColorHover: string,
    borderColorHover: string,
    bgColorActive: string,
    borderColor: string
  },
  buttonName: string,
  onClick: ()=>void
};

//CutomizedFormProps
export interface CustomizedFormProps <T> {
    fields: {name:string, label:string, type: string}[]
    initialValues: T,
    onSubmitFormik: any,
    validationSchema: any,
    customFormStyles: {
      label: any,
      button: any
    },
    formName: string,
    cb?: any,
    isCancelButton: boolean
}

// containers/DashboardCardDeck
export interface DashboardCardDeckProps {
  handler: any
}

// components/DashboardCard
export interface DashboardCardProps {
  data: any
};

// componenets/ProductCard
export interface ProductCardProps {
  data: any,
  handlers: any,
  states: any
}
// componenets/AccountCard
export interface AccountCardProps {
  data: any,
}
// componenets/StoreCard
export interface StoreCardProps {
  data: any,
}

// pages/AddToBasketPage 
export interface AddToBasketPageProps {
  handlers: any,
  states: any
}
// pages/HistoryPage 
export interface HistoryPageProps {
  handlers?: any,
  states?: any
}

export interface BasketItem {
  addedItems: number,
  itemId: string,
  itemName: string
  totalItemPrice: number
}

// actions
export interface ProductActionProps {
  reduxState?:any
}
export interface TokenActionProps {
  reduxState?:any
}

//components/Searchbar
export interface SearchBarProps {
  placeholderMessage?: any
}

// components/EditAccountFrom 
export interface EditAccountFrom {
  handlers?: any,
  states?: any
}

// components/DeleteAccountFrom 
export interface DeleteAccountFrom {
  handlers?: any,
  states?: any
}
// components/DeleteStoreFrom 
export interface DeleteStoreFrom {
  handlers?: any,
  states?: any
}


// components/slidingBar
export interface SlidingBarProps<T> {
  items?: T[],
  page: string
}

export interface TransactionMenuItems {
  field: string,
  handler: any,
  image?: any,
}