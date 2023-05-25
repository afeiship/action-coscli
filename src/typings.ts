interface NxStatic {
  $set: (inKey: any, inValue?: any) => void;
  $get: (inKey?: string, inDefault?: any) => any;
  $app: any;
  $pin: any;
  $call: (inName: string, ...args: any[]) => Function;
  $query: (inKey?: string, inDefault?: Function) => any;
  $map: (inArray: string[]) => Record<string, Function>;
}
