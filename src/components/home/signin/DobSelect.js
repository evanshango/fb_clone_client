import React from 'react'
import {useMediaQuery} from "react-responsive"

const DobSelect = ({bDay, bMonth, bYear, error, onChange}) => {
    const view1 = useMediaQuery({
        query: '(min-width: 539px)'
    })
    const view2 = useMediaQuery({
        query: '(min-width: 850px)'
    })
    const view3 = useMediaQuery({
        query: '(min-width: 1170px)'
    })

    const tempYear = new Date().getFullYear()
    const years = Array.from(new Array(108), (val, index) => tempYear - index)
    const months = Array.from(new Array(12), (val, index) => 1 + index)
    const getDays = () => new Date(bYear, bMonth, 0).getDate()
    const days = Array.from(new Array(getDays()), (val, index) => 1 + index)

    return (
        <div className="signup_grid" style={{marginBottom: `${error && !view3 ? '80px' : '0'}`}}>
            <select name="bDay" value={bDay} onChange={onChange}>
                {days.map((day, i) => (
                    <option key={i} value={String(day)}>{day}</option>
                ))}
            </select>
            <select name="bMonth" value={bMonth} onChange={onChange}>
                {months.map((month, i) => (
                    <option key={i} value={String(month)}>{month}</option>
                ))}
            </select>
            <select name="bYear" value={bYear} onChange={onChange}>
                {years.map((year, i) => (
                    <option key={i} value={String(year)}>{year}</option>
                ))}
            </select>
            {error && (
                <div className={!view3 ? 'input_error' : 'input_error input_error_select'}>
                    <div className={!view3 ? 'error_arrow_bottom' : 'error_arrow_right'}
                         style={{transform: 'translateY(1px)'}}/>
                    {error}
                </div>
            )}
        </div>
    )
}

export default DobSelect
