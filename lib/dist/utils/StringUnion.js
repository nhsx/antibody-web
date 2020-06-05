"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TypeScript will infer a string union type from the literal values passed to
// this function. Without `extends string`, it would instead generalize them
// to the common string type. 
exports.StringUnion = (...values) => {
    Object.freeze(values);
    const valueSet = new Set(values);
    const guard = (value) => {
        return valueSet.has(value);
    };
    const check = (value) => {
        if (!guard(value)) {
            const actual = JSON.stringify(value);
            const expected = values.map(s => JSON.stringify(s)).join(' | ');
            throw new TypeError(`Value '${actual}' is not assignable to type '${expected}'.`);
        }
        return value;
    };
    const unionNamespace = { guard, check, values };
    return Object.freeze(unionNamespace);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaW5nVW5pb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy9TdHJpbmdVbmlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhFQUE4RTtBQUM5RSw0RUFBNEU7QUFDNUUsOEJBQThCO0FBQ2pCLFFBQUEsV0FBVyxHQUFHLENBQTJCLEdBQUcsTUFBbUIsRUFBRSxFQUFFO0lBQzlFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsTUFBTSxRQUFRLEdBQWdCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTlDLE1BQU0sS0FBSyxHQUFHLENBQUMsS0FBYSxFQUFzQixFQUFFO1FBQ2xELE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxDQUFDLEtBQWEsRUFBYSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRSxNQUFNLElBQUksU0FBUyxDQUFDLFVBQVUsTUFBTSxnQ0FBZ0MsUUFBUSxJQUFJLENBQUMsQ0FBQztTQUNuRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQyxDQUFDO0lBRUYsTUFBTSxjQUFjLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ2hELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUEyRCxDQUFDLENBQUM7QUFDcEYsQ0FBQyxDQUFDIn0=