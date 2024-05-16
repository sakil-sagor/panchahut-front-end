import { TeacherState } from "../../../contexts/TeacherProvider";

const UpdateTeacher = () => {
    const { teacher } = TeacherState()
    const updateTeacehr = (e) => {
        e.preventDefault()

    }
    return (
        <div className='bg-blue-50 min-h-screen'>
            <div className='full-width-all pt-4  pb-24 '>
                <div className='w-full md:2/4 lg:w-2/4 m-auto pt-12'>
                    <div className='bg-blue-50 '>
                        <div className=' '>
                            <div className=' mt-4 '>

                                <form className=" border shadow-xl shadow-blue-300 px-2 py-6 md:p-8 rounded-md" onSubmit={updateTeacehr}>
                                    <div className='flex flex-col w-full'>
                                        <label className=' text-gray-600 font-semibold block ' htmlFor='teacherName'>
                                            Teacher Name
                                        </label>
                                        <input
                                            required
                                            className='py-1 px-2 rounded-md border border-gray-300'
                                            type='text'
                                            name='teacherName'
                                            id='teacherName'
                                        // value={state.teacherName}


                                        />
                                    </div>

                                    <div className='flex flex-col w-full mt-2'>
                                        <label className=' text-gray-600 font-semibold block ' htmlFor='fatherName'>
                                            Father Name
                                        </label>
                                        <input
                                            className='py-1 px-2  rounded-md border border-gray-300'
                                            type='text'
                                            name='fatherName'
                                            id='fatherName'
                                            // value={state.fatherName}
                                            required


                                        />
                                    </div>
                                    <div className='flex space-x-4 justify-between mt-2'>
                                        <div className='w-1/2'>
                                            <label className=' text-gray-600 font-semibold block ' htmlFor='teacherId'>
                                                Teacher Id
                                            </label>
                                            <input
                                                required
                                                className='w-full  px-2 py-1 rounded-md border border-gray-300'
                                                type='number'
                                                name='teacherId'
                                                // value={state.teacherId}
                                                id='teacherId'

                                            />
                                        </div>
                                        <div className='w-1/2'>
                                            <label className=' text-gray-600 font-semibold block  ' htmlFor='teacherPhone'>
                                                Phone
                                            </label>
                                            <input
                                                required
                                                className='w-full  px-2 py-1 rounded-md border border-gray-300'
                                                type='number'
                                                name='teacherPhone'
                                                // value={state.teacherPhone}
                                                id='teacherPhone'

                                            />
                                        </div>
                                    </div>
                                    <div className='flex space-x-4 justify-between mt-2'>
                                        <div className='w-1/2'>
                                            <label className=' text-gray-600 font-semibold block ' for='gender'>
                                                Gender
                                            </label>
                                            <select
                                                className='block px-2 py-1 rounded-md w-full border border-gray-300 text-center'
                                                name='gender'
                                                id='gender'
                                                // value={state.gender}
                                                required

                                            >
                                                <option className='' value='' disabled selected>--Gender--</option>
                                                <option value='male'>Male </option>
                                                <option value='female'>Female</option>
                                                <option value='others'>Others</option>

                                            </select>
                                        </div>
                                        <div className='w-1/2'>
                                            <label className=' text-gray-600 font-semibold block  ' for='religion'>
                                                Religion
                                            </label>
                                            <select
                                                className='block px-2 py-1 rounded-md w-full border border-gray-300 text-center'
                                                name='religion'
                                                id='religion'
                                                // value={state.religion}
                                                required

                                            >
                                                <option className='' value='' disabled selected>--Religion Type--</option>
                                                <option value='islam'>Islam </option>
                                                <option value='hindu'>Hindu</option>
                                                <option value='buddha'>Buddha</option>
                                                <option value='christianity'>Christianity</option>
                                                <option value='others'>Others</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='flex justify-between    mt-2 space-x-4'>
                                        <div className='w-1/2'>
                                            <label className=' text-gray-600 font-semibold block ' for='degree'>
                                                Degree
                                            </label>
                                            <input
                                                required
                                                className='py-1 px-2 rounded-md w-full border border-gray-300'
                                                type='text'
                                                name='degree'
                                                // value={state.degree}
                                                id='degree'


                                            />
                                        </div>
                                        <div className='w-1/2'>
                                            <label className=' text-gray-600 font-semibold block  ' for='bloodGroup'>
                                                Blood Group
                                            </label>
                                            <select
                                                className='block px-2 py-1 rounded-md w-full border border-gray-300 text-center'
                                                name='bloodGroup'
                                                id='bloodGroup'
                                                // value={state.bloodGroup}
                                                required

                                            >
                                                <option className='' value='' disabled selected>--Blood Group--</option>
                                                <option value='A+'>A+ </option>
                                                <option value='B+'>B+</option>
                                                <option value='AB+'>AB+</option>
                                                <option value='O+'>O+</option>
                                                <option value='A-'>A-</option>
                                                <option value='B-'>B-</option>
                                                <option value='O-'>AB-</option>
                                                <option value='O-'>O-</option>
                                            </select>
                                        </div>


                                    </div>

                                    <div className='flex justify-between   mt-2 space-x-4 '>


                                        <div className='w-1/2'>
                                            <label className=' text-gray-600 font-semibold block  ' for='department'>
                                                Department
                                            </label>
                                            <input
                                                required
                                                className='py-1 px-2 rounded-md w-full border border-gray-300'
                                                type='text'
                                                name='department'
                                                // value={state.department}
                                                id='department'

                                            />
                                        </div>
                                        <div className='w-1/2'>
                                            <label className=' text-gray-600 font-semibold block' for='joining'>
                                                Joining
                                            </label>
                                            <input
                                                required
                                                className='py-1 px-2 rounded-md w-full border border-gray-300'
                                                type='date'
                                                name='joining'
                                                // value={state.joining}
                                                id='joining'


                                            />
                                        </div>


                                    </div>

                                    <div className='flex justify-between mt-2 space-x-4 '>
                                        <div className='w-1/2'>
                                            <label className=' text-gray-600 font-semibold block ' for='email'>
                                                Email
                                            </label>
                                            <input
                                                required
                                                className='py-1 px-2 rounded-md w-full border border-gray-300'
                                                type='email'
                                                name='email'
                                                // value={state.email}
                                                id='email'

                                            />
                                        </div>
                                        <div className='w-1/2'>
                                            <label className=' text-gray-600 font-semibold block ' for='facebook'>
                                                Facebook
                                            </label>
                                            <input
                                                required
                                                className='py-1 px-2 rounded-md w-full border border-gray-300'
                                                type='text'
                                                name='facebook'
                                                // value={state.facebook}
                                                id='facebook'


                                            />
                                        </div>


                                    </div>
                                    <div className='flex space-x-4 justify-between mt-2'>
                                        <div className='w-1/2'>
                                            <label className=' text-gray-600 font-semibold block  ' for='image'>
                                                Image
                                            </label>
                                            <input
                                                type="file"
                                                required

                                                accept="image/*"
                                                id='image'
                                            // onChange={(e) => setImageFile(e.target.files[0])}
                                            />
                                        </div>
                                        <div className='w-1/2'>
                                            <label className=' text-gray-600 font-semibold block  ' for='title'>
                                                Title
                                            </label>
                                            <select
                                                className='block px-2 py-1 rounded-md w-full border border-gray-300 text-center'
                                                name='title'
                                                // value={state.title}
                                                id='title'
                                                required

                                            >
                                                <option className='' value='' disabled selected>--Title Type--</option>
                                                <option value='Headmaster'>Headmaster </option>
                                                <option value='Headmistress'>Headmistress </option>
                                                <option value='Asst. Headmaster'>Asst. Headmaster </option>
                                                <option value='Asst. Headmistress'>Asst. Headmistress </option>
                                                <option value='Asst. Teacher'>Asst. Teacher</option>
                                                <option value='Office Asst.'>Office Asst.</option>
                                                <option value='Office Asst.'>Office Asst.</option>
                                                <option value='MLSS'>MLSS</option>

                                            </select>
                                        </div>
                                    </div>

                                    <div className='flex flex-col w-full mt-2'>
                                        <label className=' text-gray-600 font-semibold block ' for='address'>
                                            Address
                                        </label>
                                        <textarea
                                            required
                                            className='py-1 rounded-md  px-2  border border-gray-300'
                                            name='address'
                                            id='address'
                                            // value={state.address}
                                            cols='30'
                                            rows='2'

                                        ></textarea>
                                    </div>
                                    <div className=' mt-8 '>
                                        <button
                                            className={` px-4 py-2  m-auto block bg-indigo-500 hover:bg-indigo-700 duration-200 rounded-md font-semibold text-white text-lg disabled:bg-gray-500 `}
                                            type='submit'
                                        >
                                            {/* {
                                loading ? <img className='w-8 mx-16' src={blue} alt="" /> : <span className='w-10 mx-12 py-12'>Register</span>
                            } */}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default UpdateTeacher;