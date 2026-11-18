import Header from "../components/Header.jsx";
import "../App.css"

export default function Login() {
    return (
        <div className={"h-full flex flex-col"}>
            <Header/>
            <div className="bg-gray-100 grow flex flex-col items-center justify-center pt-10 pb-10">
                <div className="bg-white h-30 w-100 rounded-lg shadow-md flex flex-col items-center p-4 gap-2">
                    <script src="https://apis.google.com/js/platform.js" async defer/>
                    <meta name="google-signin-client_id" content={import.meta.env.PUBLIC_GOOGLE_CLIENT_ID}/>
                    <div className="font-title text-lg">
                        Prijava
                    </div>
                    <div className="g-signin2 h-10 w-full flex flex-row justify-center" data-onsuccess="onSignIn"></div>
                </div>
            </div>

        </div>
    );
}