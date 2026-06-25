import React from 'react'
import namePlateImage from "../assets/message_box/messageBox3.jpg"
const NamePlate = ({ top, left, width, name }) => {
    return (
        <div
            className="absolute group animate-[bounce_3s_infinite] z-[11]"
            style={{
                top: top,
                left: left,
                width: width
            }}>
            <div className="relative w-full overflow-hidden">
                <img className='w-full h-auto object-contain' src={namePlateImage} alt="Name Plate" />
                <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-lg leading-tight text-black font-semibold">
                    {name}
                </span>
            </div>
        </div>
    )
}

export default NamePlate
