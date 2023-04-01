import { Outlet } from "react-router-dom"
import MainNavigation from '../components/MainNavigation'


export default function RoutPage() {


    // const navigation = useNavigation()

    return <>
        <MainNavigation></MainNavigation>
        <main style={{textAlign: 'center'}}>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet>

        </Outlet>
        </main>
    </>
}