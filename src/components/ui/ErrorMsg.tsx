interface IProps {
  errormsg: string | undefined;
}
export default function ErrorMsg({ errormsg }: IProps) {
  return <p className="text-red-500">{errormsg}</p>;
}
