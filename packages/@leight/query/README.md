# Query

This is simple package used to shape Queries used to get data from some source.

Done with support for Filtering, Sorting and Paging (with generics). Doesn't need @leight stuff to work.

## API

Here are two interesting things:

`IQuery` which defines, how query looks and what it supports:

- cursor for paging
- filter for filtering
- sort for... sort, yaaay!
- params - in rare cases, when you need to pass some kind of params to alter behavior of the query itself; **do not (
  over)use this**.

`InferQuery` this type (namespace) enables type extraction (inferring) from a `IQuery`.
