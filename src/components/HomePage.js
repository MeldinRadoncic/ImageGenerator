import React,{useState} from 'react'


import Loader from '../components/Loader'


const HomePage = () => {

    const [ data,setData ] = useState({
        description:'',
        size:'medium'
    })

    const [imageUrl, setImageUrl] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(data => ({
            ...data,
            [name]:value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
       generateImage(data.description, data.size) 
    }

    async function generateImage(description, size) {
        if(description === '') return setError('Please Describe your Image.')
        setLoading(true)
        try {
            const response = await fetch('https://image-generator-backend.onrender.com/openai/generateimage', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    description,
                    size
                })
            })
            
            const data = await response.json()
            
            if(!data.ok) {
                setError(data.message)
                setData({description:''})
                setLoading(false)
            }


            setImageUrl(data.data)
            setLoading(false)

        } catch (error) {
            setError(error)
        }
    }
    

    return (
<>
        {!loading ? 
        <>
        <section className='main'>
                <h1>Let's have a fun</h1>
                <p className='heading-paragraph'>Describe the image in any language.</p>
                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor='description'>Describe your image</label>
                    <input
                    autoComplete='off'
                     type='text'
                     id='description'
                     name = 'description'
                     placeholder='ex: Man on the moon playing chess'
                     value={data.description}
                     onChange = {handleChange}
                     />
                     {error && <p>{error}</p>}
                    
                    <select onChange={handleChange} name='size' value={data.size} aria-label='Size of the image'>
                        
                        <option value='medium'>Medium</option>
                        <option value='small'>Small</option>
                        <option value='large'>Large</option>
    </select>
    <button className='btn btn-lg'>Generate</button>
                    
                </form>

            </section>

            <section className='ImageBox'>
            {imageUrl && <img src={imageUrl} alt='image'/>}

            </section>

            </>
            
            : 
            <Loader/>
            
         }
         </>
    )
}
    
export default HomePage;


