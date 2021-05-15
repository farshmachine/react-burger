import { useEffect, useState } from 'react';

export interface WithDataProps<D> {
  data?: D;
  loading?: boolean;
  error?: TypeError;
}

const withData = <P extends {}>(url: string | ((props: P) => string)) => (
  Component: React.ComponentType<P>
) => {
  return (props: P) => {
    const [data, setData] = useState<unknown>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<TypeError>();

    useEffect(() => {
      setLoading(true);
      const endpoint = typeof url === 'function' ? url(props) : url;
      fetch(endpoint)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Что-то пошло не так');
          }

          return res.json();
        })
        .then(({ data }) => {
          setLoading(false);
          setData(data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }, [props]);

    return <Component {...props} data={data} loading={loading} error={error} />;
  };
};

export default withData;
