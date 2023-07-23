export default function splitApplyJoin(text, splitChar, joinChar, func, params) {
  return func(text.split(splitChar), ...params).join(joinChar)
}