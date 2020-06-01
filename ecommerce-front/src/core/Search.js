import React, { useState, useEffect } from "react";
import { getCategories } from "./apiCore";
import Card from "./Card";


const Search = () => {
    const [data, setData] = useState({
       categories:[],
       category: '',
       search:'',
       results: [],
       searched: false

    });

    const {categories, category, search, results, searched } = data;


    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error) 
            } else {
                setData({...data, categories: data})
            }
        })

    }

    useEffect(() => {
           loadCategories()
    }, [])

// Search 
const searchSubmit =() => {

}

// Search 
const handleChange =() => {

}


const searchForm = () => (

    <form  onSubmit={searchSubmit}>

 <span className='input-group-text bg-white'>
   <div className='input-group input group-lg'>
       <div className="input-group-prepend">
<select className='btn mr-2 mb-1 pb-1 '  onChange={handleChange("category")}>
<option value='all'>Categories</option>
{categories.map((c,i)=> (<option key={i} value={c._id}>{c.name}</option>)  )}
</select>
           </div>
<input type='search' className='form-control' onChange={handleChange('Search')}  placeholder='Search by name' />
</div>
<div className=' input-group-append'>
   
    <button type="button" className="btn btn-bg-dark" >Search</button>
   
</div>
</span>

</form>     

);

    return (  

<div className='row mb-4'>
<div className='container  '>{searchForm()}</div>
</div>


    )
    };

export default Search;