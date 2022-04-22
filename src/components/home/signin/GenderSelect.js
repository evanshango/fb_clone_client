import React from 'react'
import {useMediaQuery} from "react-responsive"

const GenderSelect = ({error, onChange}) => {
    const view1 = useMediaQuery({
        query: '(min-width: 539px)'
    })
    const view2 = useMediaQuery({
        query: '(min-width: 850px)'
    })
    const view3 = useMediaQuery({
        query: '(min-width: 1170px)'
    })

    return (
        <div className="signup_grid" style={{marginBottom: `${error && !view3 ? '70px' : '0'}`}}>
            <label htmlFor="male">Male
                <input type="radio" name={'gender'} id={'male'} value={'Male'}
                       onChange={onChange}/>
            </label>
            <label htmlFor="female">Female
                <input type="radio" name={'gender'} id={'female'} value={'Female'}
                       onChange={onChange}/>
            </label>
            <label htmlFor="male">Custom
                <input type="radio" name={'gender'} id={'other'} value={'Other'}
                       onChange={onChange}/>
            </label>
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

export default GenderSelect
