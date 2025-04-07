import { hash, compare } from "bcryptjs";

/**
 * 사용자의 비밀번호를 해시 처리 (회원가입 시 사용)
 * @param {string} password - 사용자 입력 비밀번호
 * @returns {Promise<string>} 해시된 비밀번호
 */
export async function hashPassword(password) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  }
  
  /**
   * 입력된 비밀번호와 저장된 해시된 비밀번호 비교 (로그인 시 사용)
   * @param {string} password - 로그인 시 입력한 비밀번호
   * @param {string} hashedPassword - DB에 저장된 해시 비밀번호
   * @returns {Promise<boolean>} 일치 여부
   */
  export async function verifyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword);
    return isValid;
  }