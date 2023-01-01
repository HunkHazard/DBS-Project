-- all books whether available of not
create view all_books as
select b.book_id as bid,
    c.copy_id as cid,
    b.title as title,
    a.first_name as fname,
    a.last_name as lname,
    g.name as genre,
    p.publisher as publisher,
    "false" as "status"
from Book as b
    join Copy as c on b.book_id = c.book_id
    join Issue as i on c.book_id = i.book_id
    and c.copy_id = i.copy_id
    join Author as a on b.author_id = a.author_id
    join Genre as g on b.genre_id = g.genre_id
    join Publisher as p on c.publisher_id = p.publisher_id
UNION
select b.book_id as bid,
    c.copy_id as cid,
    b.title as title,
    a.first_name as fname,
    a.last_name as lname,
    g.name as genre,
    p.publisher as publisher,
    "true" as "status"
from Book as b
    join Copy as c on b.book_id = c.book_id
    left join Issue as i on c.book_id = i.book_id
    and c.copy_id = i.copy_id
    join Author as a on b.author_id = a.author_id
    join Genre as g on b.genre_id = g.genre_id
    join Publisher as p on c.publisher_id = p.publisher_id
where i.date_issued is null
UNION
select b.book_id as bid,
    c.copy_id as cid,
    b.title as title,
    a.first_name as fname,
    a.last_name as lname,
    g.name as genre,
    p.publisher as publisher,
    "false" as "status"
from Book as b
    left join Copy as c on b.book_id = c.book_id
    left join Author as a on b.author_id = a.author_id
    left join Genre as g on b.genre_id = g.genre_id
    left join Publisher as p on c.publisher_id = p.publisher_id
where c.book_id is null;