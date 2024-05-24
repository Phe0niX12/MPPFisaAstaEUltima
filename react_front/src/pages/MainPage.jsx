
import {Link, useParams, useSearchParams} from "react-router-dom";
import { useEffect, useState } from "react";
import EditCow from "../components/EditCows"
import { useCowContext } from "../contexts/cowsContexts";
import ChartPie from "../components/ChartPie";
import { useFarmerContext } from "../contexts/farmerContexts";
import EditFarmers from "../components/EditFarmers";
// import Pagination from "../components/Pagination"

const MainPage = () => {

    const {cows,loading, updateCow, createCow, deleteCow, sortCowsByType}= useCowContext();
    const {farmers, update, create, deleteFarmer} = useFarmerContext();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectCow, setSelectCow] = useState(null);
    const [selectFarmer, setSelectFarmer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const cowsPerPage = 3;
    const indexOfLastCow = currentPage * cowsPerPage;
    const indexOfFirstCow = indexOfLastCow - cowsPerPage;
    const currentCows = cows.slice(indexOfFirstCow, indexOfLastCow);
    const currentFarmers = farmers.slice(indexOfFirstCow, indexOfLastCow);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }


    
    
    const openModalCow = cow =>{
        setSelectCow(cow);
        setModalIsOpen(true);
    }

    const openModalFarmer = farmer =>{
        setSelectFarmer(farmer)
        setModalIsOpen(true);
    }
    const closeModal = () =>{
        setModalIsOpen(false);
        setSelectCow(null);
    }

    const handleSaveCow = newCow =>{
        if(newCow.id !== -1){
            updateCow(newCow.id, newCow);
            console.log("Saving changes:", newCow);
        }else if (newCow.name !== ''){ 
            createCow(newCow);
        }
    }

    const handleSaveFarmer = newFarmer =>{
        if(newFarmer. id !== -1){
            update(newFarmer.id, newFarmer);
            console.log("Saving changes:", newFarmer);
        }else if(newFarmer.name !== ''){
            
            create(newFarmer);
        }
    }

    const handleDeleteCow = id =>{
        deleteCow(id);
    }

    const handleDeleteFarmer = id =>{
        deleteFarmer(id);
    }

    useEffect(()=>{
        
    }, [])    

    const handleSort = () =>{
        sortCowsByType();
    }

    const totalPages = () =>{
        const total = Math.ceil(cows.length / 2);
        return total;
    }

    const handleChart = () =>{
        const cowsCount = {};
        cows.map((cow)=> cowsCount[cow.type] = (cowsCount[cow.type] || 0) +1);
        const labels =[];
        const values = [];
        Object.entries(cowsCount).map(([key,value])=> {
            labels.push(key);
            values.push(value);
        })
        const backgroundColors = [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
        ];

        const chartData = {
            labels: labels,
            datasets: [
            {
                label: '# of Cows',
                data: values,
                backgroundColor: backgroundColors,
                borderWidth: 1,
            },
            ],
        };
        return chartData;

    }

    return(
    <div>
        <div >
                    
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    ID
                                </th>
                                <th>
                                    More Info
                                </th>
                                <th>
        
                                </th>
                                <th>
        
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        {        
                            currentFarmers.map((farmer) =>
                            <>
                                <tr>        
                                    <td>{farmer.name}</td>
                                    <td>{farmer.id}</td>
                                    <td><Link to={`/${farmer.id}`} class="more-button">More details</Link></td>
                                    <td><button onClick={()=> handleDeleteFarmer(farmer.id)}class="sort-button">Delete</button></td>
                                    <td><button onClick={()=>openModalFarmer(farmer)}class="add-button">Edit</button></td>
                                </tr>
                            </>
                            )
                        }
        
                                    
        
                        </tbody>
                    </table>  
                        <div className="button-container">
                            <button onClick={() => handlePageChange(currentPage-1)}
                            disabled = {currentPage === 1}
                            className="pagination-button">Previous</button>
        
                        
                            <button onClick={()=> handlePageChange(currentPage+1)}
                            disabled = {indexOfLastCow >= cows.length}
                            className="pagination-button"
                            >Next</button>
                        
                            <button onClick={() => openModalFarmer({id:-1,name:'',owned_land:'',feeding_type:'',description:''})} class="add-button">Add</button>    
                            <button onClick={()=> handleSort()}class="sort-button">Sort</button>
                        </div>
                    

                    {
                        selectFarmer && (<EditFarmers cow={selectFarmer} isOpen={modalIsOpen} closeModal={closeModal} saveChanges={handleSaveFarmer} />)
                    }
                </div>
        <div >
                    
            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            ID
                        </th>
                        <th>
                            More Info
                        </th>
                        <th>

                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                
                {        
                    currentCows.map((cow) =>
                    <>
                        <tr>        
                            <td>{cow.name}</td>
                            <td>{cow.id}</td>
                            <td><Link to={`/${cow.id}`} class="more-button">More details</Link></td>
                            <td><button onClick={()=> handleDeleteCow(cow.id)}class="sort-button">Delete</button></td>
                            <td><button onClick={()=>openModalCow(cow)}class="add-button">Edit</button></td>
                        </tr>
                    </>
                    )
                }

                            

                </tbody>
            </table>  
                <div className="button-container">
                    <button onClick={() => handlePageChange(currentPage-1)}
                    disabled = {currentPage === 1}
                    className="pagination-button">Previous</button>

                
                    <button onClick={()=> handlePageChange(currentPage+1)}
                    disabled = {indexOfLastCow >= cows.length}
                    className="pagination-button"
                    >Next</button>
                
                    <button onClick={() => openModalCow({id:-1,name:'',type:'',color:'',weigth:''})} class="add-button">Add</button>    
                    <button onClick={()=> handleSort()}class="sort-button">Sort</button>
                </div>
            
                <ChartPie chartData={handleChart()}/>
            {
                selectCow && (<EditCow cow={selectCow} isOpen={modalIsOpen} closeModal={closeModal} saveChanges={handleSaveCow} famers={farmers}/>)
            }
        </div>
    </div>
    )
}

export default MainPage;