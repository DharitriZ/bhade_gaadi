import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../store';
import {
    getCarTypesAction,
    createCarTypeAction,
    updateCarTypeAction,
    deleteCarTypeAction,
} from '../store/actions/carType';
import { CarType } from '../store/actions/carType';
import ConfirmModal from './Modal/ConfirmModal';
import { toast } from 'react-toastify';
import moment from 'moment';


const CarTypes: React.FC = () => {
    const dispatch = useAppDispatch();
    const { carTypes } = useAppSelector((state) => state.carType);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCarType, setSelectedCarType] = useState<CarType | null>(null);
    const [loading, setLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(getCarTypesAction({})).unwrap();
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            description: Yup.string().required('Description is required'),
        }),
        onSubmit: async (values) => {
            try {
                if (selectedCarType) {
                    await dispatch(
                        updateCarTypeAction({
                            id: selectedCarType.id,
                            ...values,
                        })
                    ).unwrap();
                    toast.success('car type updated successfully')
                } else {
                    await dispatch(createCarTypeAction(values)).unwrap();
                    toast.success('car type added successfully')
                }
                dispatch(getCarTypesAction({})).unwrap();
                formik.resetForm();
                setIsAddModalOpen(false);
                setSelectedCarType(null);
            } catch (error: any) {
                toast.error(error.message || 'something went wrong please try again');
            }
        },
    });

    const handleEdit = (carType: CarType) => {
        setSelectedCarType(carType);
        formik.setValues({
            name: carType.name,
            description: carType.description,
        });
        setIsAddModalOpen(true);
    };

    const handleDelete = async (carType: CarType) => {
        setSelectedCarType(carType);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedCarType) {
            try {
                await dispatch(deleteCarTypeAction(selectedCarType.id)).unwrap();
                dispatch(getCarTypesAction({})).unwrap();
                setIsDeleteModalOpen(false);
                setSelectedCarType(null);
                toast.success('car type deleted successfully')
            } catch (error: any) {
                toast.error(error.message || 'something went wrong please try again')
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsAddModalOpen(false);
                setSelectedCarType(null);
                formik.resetForm();
            }
        };

        if (isAddModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAddModalOpen, formik]);


    return (
        <div className="sm:p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1E3A8A]">Car Types</h2>
                <button
                    onClick={() => {
                        setSelectedCarType(null);
                        formik.resetForm();
                        setIsAddModalOpen(true);
                    }}
                    className="bg-[#1E3A8A] text-white px-4 py-2 rounded-md hover:bg-[#1E3A8A]/90"
                >
                    Add Car Type
                </button>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {carTypes?.length > 0 && carTypes?.map((carType) => (
                            <tr key={carType.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{carType.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-500">{carType.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {moment(carType.createdAt).local().format('MMMM D, YYYY, h:mm A')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(carType)}
                                        className="text-[#1E3A8A] hover:text-[#1E3A8A]/80 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(carType)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div ref={modalRef} className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                                {selectedCarType ? 'Edit Car Type' : 'Add Car Type'}
                                            </h3>
                                            <div className="mt-2 space-y-4">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.name}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] shadow-sm"
                                                    />
                                                    {formik.touched.name && formik.errors.name && (
                                                        <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.description}
                                                        rows={3}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] shadow-sm"
                                                    />
                                                    {formik.touched.description && formik.errors.description && (
                                                        <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#1E3A8A] text-base font-medium text-white hover:bg-[#1E3A8A]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3A8A] sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        {selectedCarType ? 'Update' : 'Add'}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3A8A] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            setIsAddModalOpen(false);
                                            setSelectedCarType(null);
                                            formik.resetForm();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedCarType(null);
                }}
                onConfirm={confirmDelete}
                title="Delete Car Type"
                message={`Are you sure you want to delete "${selectedCarType?.name}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default CarTypes; 