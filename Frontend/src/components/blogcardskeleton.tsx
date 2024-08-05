import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const Blogcardskeleton = () => {
    return (
        <div className="border-b m-1">
            <div className="flex items-center">
                <div>
                    <Skeleton circle={true} height={25} width={25} />
                </div>
                <div className="ml-2">
                    <Skeleton width={100} />
                </div>
                <div className="text-gray-400 ml-2">
                    <Skeleton width={80} />
                </div>
            </div>
            <div className="font-bold text-xl w-3/4">
                <Skeleton width={`70%`} />
            </div>
            <div className="w-4/5 text-sm">
                <Skeleton count={2} />
            </div>
            <div className="text-gray-400 text-xs my-3">
                <Skeleton width={50} />
            </div>
        </div>
    );
};