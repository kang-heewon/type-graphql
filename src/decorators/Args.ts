import { getMetadataStorage } from "../metadata/getMetadataStorage";
import { getParamInfo } from "../helpers/params";
import { ValidateOptions, ReturnTypeFunc } from "./types";
import { getTypeDecoratorParams } from "../helpers/decorators";
import { ParameterDecorator } from "../interfaces/LegacyDecorators";

export function Args(): ParameterDecorator;
export function Args(options: ValidateOptions): ParameterDecorator;
export function Args(
  paramTypeFunction: ReturnTypeFunc,
  options?: ValidateOptions,
): ParameterDecorator;
export function Args(
  paramTypeFnOrOptions?: ReturnTypeFunc | ValidateOptions,
  maybeOptions?: ValidateOptions,
): ParameterDecorator {
  const { options, returnTypeFunc } = getTypeDecoratorParams(paramTypeFnOrOptions, maybeOptions);
  return (prototype, propertyKey, parameterIndex) => {
    getMetadataStorage().collectHandlerParamMetadata({
      kind: "args",
      ...getParamInfo({ prototype, propertyKey, parameterIndex, returnTypeFunc, options }),
    });
  };
}
