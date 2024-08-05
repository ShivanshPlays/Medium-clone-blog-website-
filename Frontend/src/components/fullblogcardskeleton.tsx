import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const FullBlogCardSkeleton = () => {
  return (
    <div className="px-10 py-5 grid grid-cols-12">
      <div className="col-span-8">
        <div>
          <div className="text-4xl font-extrabold">
            <Skeleton height={40} width={`60%`} />
          </div>
          <div className="text-gray-500 my-3">
            <Skeleton width={150} />
          </div>
          <div className="text-sm">
            <Skeleton count={5} />
          </div>
        </div>
      </div>
      <div className="ml-5 col-span-4">
        <div>
          <div className="mb-3 font-medium">
            <Skeleton width={60} />
          </div>

          <div className="flex mb-3">
            <div className="mr-2 flex items-center justify-center">
              <Skeleton circle={true} height={20} width={20} />
            </div>
            <div className="text-lg font-bold">
              <Skeleton width={100} />
            </div>
          </div>
          <div>
            <Skeleton count={3} />
          </div>
        </div>
      </div>
    </div>
  );
};
