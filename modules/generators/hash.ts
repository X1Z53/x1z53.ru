import md5 from "crypto-js/md5"
import sha1 from "crypto-js/sha1"
import sha224 from "crypto-js/sha224"
import sha256 from "crypto-js/sha256"
import sha3 from "crypto-js/sha3"
import sha384 from "crypto-js/sha384"
import sha512 from "crypto-js/sha512"

export default function hash(text: string, algorithm: string): string {
  const algorithms = { md5, sha1, sha3, sha224, sha256, sha384, sha512 }
  return algorithms[algorithm](text).toString()
}
