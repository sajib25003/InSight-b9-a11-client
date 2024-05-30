import { useQuery } from '@tanstack/react-query';
import { Hourglass } from 'react-loader-spinner';

const TopContributors = () => {
  const {
    isPending,
    isError,
    error,
    data: blogs,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch('https://insight-b9-a11-server.vercel.app/blogs');
      return res.json();
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      </div>
    );
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  // Function to get top contributors
  const getTopContributors = (blogs) => {
    const contributorCount = {};

    blogs.forEach((blog) => {
      const name = blog.name;
      if (contributorCount[name]) {
        contributorCount[name]++;
      } else {
        contributorCount[name] = 1;
      }
    });

    const sortedContributors = Object.keys(contributorCount).map((name) => ({
      name: name,
      count: contributorCount[name],
    })).sort((a, b) => b.count - a.count);

    return sortedContributors;
  };

  const topContributors = getTopContributors(blogs);

  return (
    <div className="flex flex-col justify-center mx-10 mb-10 lg:mx-32">
      
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-blue-700 text-center my-3 lg:mt-10">
        Top Contributors
      </h2>

      <div className="top-contributors md:my-10">
        
        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <thead>
              <tr className=' text-sm md:text-xl text-emerald-600'>
                <th className="py-2 px-2 md:px-4 border-b">Sl.</th>
                <th className="py-2 md:px-4 border-b">Contributor Name</th>
                <th className="py-2 md:px-4 border-b">Blog Count</th>
              </tr>
            </thead>
            <tbody className=' text-sm'>
              {topContributors.map((contributor, index) => (
                <tr key={index}>
                  <td className="py-2 px-2 md:px-4 border-b text-center">{index + 1}</td>
                  <td className="py-2 md:px-4 border-b text-center">{contributor.name}</td>
                  <td className="py-2 md:px-4 border-b text-center">{contributor.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopContributors;
