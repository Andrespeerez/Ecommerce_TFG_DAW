import { Head, Link, router } from '@inertiajs/react';
import PageHeader from '@/Components/Admin/PageHeader'; 
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/Components/Admin/Table'; 
import { Button, ButtonLink } from '@/Components/Admin/Button'; 

export default function Index ({ products }) {
    
    /**
     * Delete a product after confirmation
     * @param {Object} product 
     */
    function deleteProduct(product) {
        if (confirm(`¿Deseas eliminar el producto "${product.name}"?`)) {
            router.delete(`/admin/productos/${product.id}`);
        }
    }


    return (
        <>
            <Head title="Productos - Admin" />

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                
                <PageHeader title="Productos">
                    <ButtonLink href="/admin/productos/create">
                        Crear Producto
                    </ButtonLink>
                </PageHeader>

                <Table>
                    <TableHeader>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Material</TableHead>
                        <TableHead>Acabado</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>IVA</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Estado</TableHead>
                    </TableHeader>
                    <TableBody>
                        {products.data.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className='text-sm text-gray-900'>{product.name}</TableCell>
                                <TableCell className='text-sm text-gray-900'>{product.category.name}</TableCell>
                                <TableCell className='text-sm text-gray-900'>{product.material.name}</TableCell>
                                <TableCell className='text-sm text-gray-900'>{product.finish.name}</TableCell>
                                <TableCell className='text-sm text-gray-900'>{product.price_with_iva}</TableCell>
                                <TableCell className='text-sm text-gray-900'>{product.iva_percentage}</TableCell>
                                <TableCell className='text-sm text-gray-900'>{product.stock}</TableCell>
                                <TableCell className='text-sm text-gray-900'>{product.active ? 'Activo' : 'Inactivo'}</TableCell>
                                <TableCell className='text-sm text-gray-900'>
                                    <Link
                                    href={`/admin/productos/${product.id}/edit`}
                                    >
                                        Editar
                                    </Link>
                                    <Button
                                    onClick={() => deleteProduct(product)}
                                    variant='danger'
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex justify-center gap-1 mt-6">
                    {products.links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => link.url && router.visit(link.url)}
                            disabled={!link.url}
                            className={`px-4 py-2 text-sm rounded ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : link.url
                                    ? 'bg-white text-gray-700 hover:bg-gray-50 border'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

            </div>
        </>
    );

}