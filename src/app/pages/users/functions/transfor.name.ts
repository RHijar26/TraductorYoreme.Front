export function  TransforImgName(fullName: string): string {
    const names = fullName.split(' ').filter(name => name);
    if (names.length === 0) return 'X';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
}