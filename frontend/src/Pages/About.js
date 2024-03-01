import React from 'react'
import Layout from '../Components/Layout/Layout'

const About = () => {
    return (
        <Layout title="About Us">
            <div className='row'>
                <div className='col-md-5 m-5'>
                    <h2 className='bg-dark text-white text-center about-heading'>About Us</h2>
                    <p> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                        vehicula, nunc sit amet varius fermentum, nunc libero ultrices
                        tortor, nec laoreet nunc purus nec libero. Nulla facilisi. Nulla
                        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                    </p>
                </div>
                <div className='col-md-1'>
                    <img src="https://t3.ftcdn.net/jpg/01/28/44/76/360_F_128447604_6deYSrg6bgH2F3YaoU0icdhvxNu4ReDN.jpg" alt="About" />
                </div>

            </div>
        </Layout>
    )
}

export default About
