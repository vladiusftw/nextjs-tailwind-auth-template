'use client'
import React, { useState, useEffect } from 'react'
import ArrowDown from '../icons/ArrowDown'

type Props = {
    page: number
    totalPages: number
    onChange: (newPage: number) => void
    offset: number
}

const Pagination = ({ page, totalPages, onChange, offset }: Props) => {
    const [fromArray, setFromArray] = useState<number[]>([])
    const [toArray, setToArray] = useState<number[]>([])

    useEffect(() => {
        const fillPagination = () => {
            const tempArr = []
            const startFrom = page - offset > 0 ? page - offset : 1
            for (let i = startFrom; i < page; i++) {
                tempArr.push(i)
            }
            setFromArray([...tempArr])

            const tempArr2 = []
            const endTo =
                page + offset > totalPages ? totalPages : page + offset
            for (let i = page + 1; i <= endTo; i++) {
                tempArr2.push(i)
            }
            setToArray([...tempArr2])
        }
        fillPagination()
    }, [page, totalPages, offset])

    return (
        <div className="w-full flex items-center justify-center">
            {page > 1 && (
                <button
                    className="rotate-90 rtl:rotate-[-90deg] me-2"
                    onClick={() => onChange(page - 1)}
                >
                    <ArrowDown />
                </button>
            )}

            {page > offset + 1 && (
                <div className="flex items-center">
                    <button
                        onClick={() => onChange(1)}
                        className="mx-1 w-10 h-10 border border-brand-300 rounded-full hover:bg-brand-200 hover:text-white hover:border-brand-200 transition-colors duration-300 ease-in-out flex flex-col items-center justify-center"
                    >
                        {1}
                    </button>
                    <span>...</span>
                </div>
            )}

            {page != 1 &&
                fromArray.map((item: number) => {
                    return (
                        <button
                            className="mx-1 w-10 h-10 border border-brand-300 rounded-full hover:bg-brand-100 hover:text-white hover:border-brand-100 transition-colors duration-300 ease-in-out flex flex-col items-center justify-center"
                            onClick={() => onChange(item)}
                            key={item}
                        >
                            {item}
                        </button>
                    )
                })}

            <span className="w-10 h-10 rounded-full text-white bg-brand-100 border-[1px] border-brand-100 flex flex-col items-center justify-center">
                {page}
            </span>

            {totalPages > page &&
                toArray.map((item: number) => {
                    return (
                        <button
                            className="mx-1 w-10 h-10 border border-brand-300 rounded-full hover:bg-brand-200 hover:text-white hover:border-brand-200 transition-colors duration-300 ease-in-out flex flex-col items-center justify-center"
                            onClick={() => onChange(item)}
                            key={item}
                        >
                            {item}
                        </button>
                    )
                })}

            {totalPages - (page + offset) > 0 && (
                <div className="flex items-center">
                    <span>...</span>
                    <button
                        onClick={() => onChange(totalPages)}
                        className="mx-1 w-10 h-10 border border-brand-300 rounded-full hover:bg-brand-200 hover:text-white hover:border-brand-200 transition-colors duration-300 ease-in-out flex flex-col items-center justify-center"
                    >
                        {totalPages}
                    </button>
                </div>
            )}

            {page < totalPages && (
                <button
                    className="rotate-[-90deg] rtl:rotate-90 ms-2"
                    onClick={() => onChange(page + 1)}
                >
                    <ArrowDown />
                </button>
            )}
        </div>
    )
}

export default Pagination
