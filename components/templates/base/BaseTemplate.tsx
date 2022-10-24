export interface IBaseTemplate {
  sampleTextProp: string;
}

const BaseTemplate = ({ sampleTextProp }: IBaseTemplate) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default BaseTemplate;
