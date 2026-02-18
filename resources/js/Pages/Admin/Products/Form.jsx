import { Head, useForm } from '@inertiajs/react';
import PageHeader from '@/Components/Admin/PageHeader';
import Input from '@/Components/Admin/Form/Input';
import Select from '@/Components/Admin/Form/Select';
import TextArea from '@/Components/Admin/Form/TextArea';
import CheckBox from '@/Components/Admin/Form/CheckBox';
import { Button, ButtonLink } from '@/Components/Admin/Button';

export default function Form({ product, categories, materials, finishes }) {
    const isEditing = product !== null;
    
    // useForm initialize the form state
    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price_without_iva: product?.price_without_iva || '',
        iva_percentage: product?.iva_percentage || 21,
        stock: product?.stock || 0,
        category_id: product?.category_id || '',
        material_id: product?.material_id || '',
        finish_id: product?.finish_id || '',
        width_cm: product?.width_cm || '',
        height_cm: product?.height_cm || '',
        depth_cm: product?.depth_cm || '',
        active: product?.active ?? true,
    });

    function submit(e) {
        e.preventDefault();
        
        if (isEditing) {
            put(`/admin/productos/${product.id}`);
        } else {
            post('/admin/productos');
        }
    }

    return (
        <>
            <Head title={isEditing ? 'Editar Producto' : 'Crear Producto'} />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <PageHeader title={isEditing ? 'Editar Producto' : 'Crear Producto'}>
                    <ButtonLink href="/admin/productos" variant="secondary">
                        Volver
                    </ButtonLink>
                </PageHeader>

                <form onSubmit={submit} className="bg-white shadow rounded-lg p-6 space-y-6">
                    <Input
                        label="Nombre"
                        name="name"
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        error={errors.name}
                        required
                    />

                    <TextArea
                        label="Descripción"
                        name="description"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        error={errors.description}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Precio sin IVA"
                            name="price_without_iva"
                            type="number"
                            step="0.01"
                            value={data.price_without_iva}
                            onChange={e => setData('price_without_iva', e.target.value)}
                            error={errors.price_without_iva}
                            required
                        />
                        <Input
                            label="IVA (%)"
                            name="iva_percentage"
                            type="number"
                            value={data.iva_percentage}
                            onChange={e => setData('iva_percentage', e.target.value)}
                            error={errors.iva_percentage}
                            required
                        />
                    </div>

                    <Input
                        label="Stock"
                        name="stock"
                        type="number"
                        value={data.stock}
                        onChange={e => setData('stock', e.target.value)}
                        error={errors.stock}
                        required
                    />

                    <div className="grid grid-cols-3 gap-4">
                        <Select
                            label="Categoría"
                            name="category_id"
                            value={data.category_id}
                            onChange={e => setData('category_id', e.target.value)}
                            options={categories}
                            error={errors.category_id}
                            required
                        />
                        <Select
                            label="Material"
                            name="material_id"
                            value={data.material_id}
                            onChange={e => setData('material_id', e.target.value)}
                            options={materials}
                            error={errors.material_id}
                            required
                        />
                        <Select
                            label="Acabado"
                            name="finish_id"
                            value={data.finish_id}
                            onChange={e => setData('finish_id', e.target.value)}
                            options={finishes}
                            error={errors.finish_id}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <Input
                            label="Ancho (cm)"
                            name="width_cm"
                            type="number"
                            step="0.01"
                            value={data.width_cm}
                            onChange={e => setData('width_cm', e.target.value)}
                            error={errors.width_cm}
                            required
                        />
                        <Input
                            label="Alto (cm)"
                            name="height_cm"
                            type="number"
                            step="0.01"
                            value={data.height_cm}
                            onChange={e => setData('height_cm', e.target.value)}
                            error={errors.height_cm}
                            required
                        />
                        <Input
                            label="Profundidad (cm)"
                            name="depth_cm"
                            type="number"
                            step="0.01"
                            value={data.depth_cm}
                            onChange={e => setData('depth_cm', e.target.value)}
                            error={errors.depth_cm}
                            required
                        />
                    </div>

                    <CheckBox
                        label="Producto activo"
                        name="active"
                        checked={data.active}
                        onChange={e => setData('active', e.target.checked)}
                    />

                    <div className="flex justify-end gap-4">
                        <ButtonLink href="/admin/productos" variant="secondary">
                            Cancelar
                        </ButtonLink>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}