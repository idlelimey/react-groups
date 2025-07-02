import type { FunctionComponent } from 'react';

interface DiscountProps {
    discount: number;
}

const Discount: FunctionComponent<DiscountProps> = ({ discount }) => {
    return (
        <div className=" bg-rose-600 p-2 absolute -bottom-2 -left-2 z-10 rounded-md">
            <p className="text-[8px] text-white font-bold uppercase pb-0 tracking-wider">
                Today's deal
            </p>
            <p className="text-white font-bold leading-none">{discount}% off</p>
        </div>
    );
};

export default Discount;
