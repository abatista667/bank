import AccountList from "./AccountList/AccountList"
import { addOrUpdateAccount, deleteAccount, getAccounts, listCurrencies } from "./serverFunctions"

const AccountPage = async () => {
    const accounts = await getAccounts()
    const currencies = await listCurrencies()
    
    return <AccountList accounts={accounts} 
        addOrUpdateAccount={addOrUpdateAccount} 
        deleteAccount={deleteAccount} 
        currencies={currencies}/>
    }

export default AccountPage