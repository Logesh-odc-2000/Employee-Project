import { useSelector, useDispatch } from "react-redux";
import Action from './actions';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Lisiting({ handleEditClick ,calculateDuration}) {

  const dispatch = useDispatch();
  const { Delete } = Action;

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // To store the ID of the item to be deleted

  const ppls = useSelector((state) => state.employee.people);
  console.log('ppls from Store', ppls);

//Delete Functionality
  const onDeleteClick = (_id) => {
    setDeleteId(_id);
    setShowDeleteConfirmation(true);
  };

// Delete Alert Functionality  
  const onDeleteConfirm = () => {
    dispatch(Delete({ id: deleteId }));
    setShowDeleteConfirmation(false);
  };
  const onDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className='flex items-center justify-center'>
      <div className="relative w-11/12  shadow-md ">
         
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="w-full border-separate border-spacing-0">
                <thead className="uppercase">
                  <tr>
                    <th
                    scope="col"
                    className="sticky  border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    id
                  </th>
                    <th
                      scope="col"
                      className="sticky   border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="sticky   hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                    DOB (MM-DD-YYYY)
                    </th>
                    <th
                      scope="col"
                      className="sticky   hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="sticky   border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      salary
                    </th>
                    <th
                    scope="col"
                    className="sticky   border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    height
                  </th>
                  <th
                    scope="col"
                    className="sticky   border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Date of joining
                  </th>
                     <th scope="col"
                    className="sticky   border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">
                      Edit
                     </th>
                     <th scope="col"
                    className="sticky   border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">
                      Delete
                     </th>
                  </tr>
                </thead>
                <tbody>
                  { ppls?.map((person, personIdx) => (
                    <tr >
                      <td
                        className={classNames(
                          personIdx !== ppls.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                        )}
                      >
                        {person.id}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== ppls.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                        )}
                      >
                        {person.name}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== ppls.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        )}
                      >
                        {person.dob}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== ppls.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                        )}
                      >
                        {person.email}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== ppls.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {person.salary}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== ppls.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                        )}
                      >
                        {person.height}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== ppls.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                        )}
                      >
                         {person.stateDate}
                      </td>
                      <td className={classNames(
                          personIdx !== ppls.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                        )}>
                    <button onClick={() => handleEditClick(person.id)}>
                      <FiEdit className='text-2xl' />
                    </button>
                  </td>
                  <td className={classNames(
                          personIdx !== ppls.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                        )}>
                    <button onClick={() => onDeleteClick(person.id)}> <RiDeleteBinLine className='text-2xl' /></button>
                  </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        
      </div>

      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-70 ">
          <div className="flex flex-col p-5 rounded-lg h-32 shadow bg-white">
            <div className="flex">
              <div className="">
                <svg class="w-6 h-6 fill-current text-red-500  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" /></svg>
              </div>
              <div className="ml-3  ">
                <p className="font-semibold text-gray-800">Are you sure you want to delete this record?</p>
              </div>
            </div>
            <div className="flex justify-end mt-4 py-2">
              <button onClick={onDeleteCancel} className="flex-1 px-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                Cancel
              </button>
              <button onClick={onDeleteConfirm} className="flex-1 px-2 py-2 ml-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>


  )
}

export default Lisiting;




