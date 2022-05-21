import { useRef } from "react";

function Login({login, setUser}) {

    const userRef = useRef(null);
    

    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <div className="w-1/2 h-10 ">
                    <h1 className="text-center mb-8">Set your nickname to join a chat</h1>
                    <div className="rounded-md bg-sky-200 border border-sky-600 p-4 my-4">
                        <form className="flex flex-col items-center space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            setUser(userRef.current.value);
                            login(true);
                        }}>
                            <input className="py-1 px-3 outline-0 w-full rounded-md" ref={userRef} placeholder="Your Nickname" />
                            <button className="bg-blue-500 text-white py-1 px-3 rounded">Join</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;