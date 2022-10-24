import { WithChildren } from '@/@types';

export interface IBaseTemplate extends WithChildren {
  sampleTextProp: string;
}

const BaseTemplate = ({ sampleTextProp, children }: IBaseTemplate) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
      {children}
    </div>
  );
};

export default BaseTemplate;
