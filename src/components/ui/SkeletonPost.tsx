import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SkeletonPost() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="max-w-md mx-auto rounded-lg my-4">
          <Stack spacing={1}>
            <Skeleton
              variant="rectangular"
              height={300}
              className="dark:bg-gray-700"
            />
            <Skeleton
              variant="text"
              width={210}
              height={30}
              className="dark:bg-gray-700"
            />
            <Skeleton variant="text" height={60} className="dark:bg-gray-700" />
            <div className="flex items-center gap-4">
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                className="dark:bg-gray-700"
              />
              <div className="flex flex-col">
                <Skeleton
                  variant="text"
                  width={20}
                  height={10}
                  className="dark:bg-gray-700"
                />
                <Skeleton
                  variant="text"
                  width={40}
                  height={10}
                  className="dark:bg-gray-700"
                />
              </div>
            </div>
          </Stack>
        </div>
      ))}
    </>
  );
}
