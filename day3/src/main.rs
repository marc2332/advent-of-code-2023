use std::collections::HashSet;

static INPUT: &str = include_str!("./input");

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
struct Num {
    x: Vec<usize>,
    y: usize,
    num: i32,
}

fn main() {
    let lines = INPUT.lines().collect::<Vec<_>>();

    let mut numbers: HashSet<Num> = HashSet::default();

    for (line_n, line) in lines.iter().enumerate() {
        let mut carrying_number = String::default();
        for (ch_n, ch) in line.chars().enumerate() {
            if ch.is_numeric() {
                carrying_number.push(ch);
            }
            if !carrying_number.is_empty() && (!ch.is_numeric() || ch_n == line.len() - 1) {
                let x = ch_n - carrying_number.len();
                let mut positions = Vec::default();
                for l in 0..carrying_number.len() {
                    positions.push(x + l)
                }
                numbers.insert(Num {
                    x: positions,
                    y: line_n,
                    num: carrying_number.parse::<i32>().unwrap(),
                });
                carrying_number.clear();
            }
        }
    }

    let mut added_numbers: HashSet<Num> = HashSet::default();
    let mut mult_gears = 0;

    for (ch_y, line) in lines.iter().enumerate() {
        for (ch_x, ch) in line.chars().enumerate() {
            if !ch.is_numeric() && ch != '.' {
                let mut prepared_nums: HashSet<Num> = HashSet::default();
                for num in numbers.iter() {
                    let matches_x = num.x.contains(&(ch_x - 1))
                        || num.x.contains(&ch_x)
                        || num.x.contains(&(ch_x + 1));
                    let matches_y = num.y == ch_y - 1 || num.y == ch_y || num.y == ch_y + 1;

                    if matches_x && matches_y {
                        prepared_nums.insert(num.clone());
                    }
                }

                if ch == '*' && prepared_nums.len() == 2 {
                    let gear_mult = prepared_nums.into_iter().fold(1, |acc, num| acc * num.num);
                    mult_gears += gear_mult;
                } else {
                    added_numbers.extend(prepared_nums);
                }
            }
        }
    }

    let p1 = added_numbers.iter().fold(0, |acc, n| acc + n.num);
    let p2 = mult_gears;

    println!("p1 -> {p1:#?} p2 -> {p2:#?}");
}
