import {useState, useEffect} from 'react'
import './App.css'

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api/test", { mode: "cors" }).then(result => result.json()).then(result => {
            setData(result);
        });
    }, []);


    console.log(data)

    var time = ""
    if (data != null) {
        time = data.time
    }

    return (
        <>
            <body className="h-dvh bg-red-500">
            time: {time}
            </body>
        </>
    )
}

export default App
