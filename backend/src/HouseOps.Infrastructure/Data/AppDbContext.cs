using HouseOps.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HouseOps.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Compra> Compras { get; set; }
    public DbSet<Item> Itens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuração da tabela Compras
        modelBuilder.Entity<Compra>(entity =>
        {
            entity.ToTable("compras");
            
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Id)
                .HasColumnName("id");
                
            entity.Property(e => e.DataCompra)
                .HasColumnName("data_compra")
                .IsRequired();
                
            entity.Property(e => e.ValorTotal)
                .HasColumnName("valor_total")
                .HasPrecision(10, 2)
                .IsRequired();
                
            entity.Property(e => e.Mercado)
                .HasColumnName("mercado")
                .HasMaxLength(200)
                .IsRequired();
                
            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .IsRequired();
                
            entity.Property(e => e.UpdatedAt)
                .HasColumnName("updated_at")
                .IsRequired();
        });

        // Configuração da tabela Itens
        modelBuilder.Entity<Item>(entity =>
        {
            entity.ToTable("itens");
            
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Id)
                .HasColumnName("id");
                
            entity.Property(e => e.Nome)
                .HasColumnName("nome")
                .HasMaxLength(200)
                .IsRequired();
                
            entity.Property(e => e.Quantidade)
                .HasColumnName("quantidade")
                .IsRequired();
                
            entity.Property(e => e.ValorUnitario)
                .HasColumnName("valor_unitario")
                .HasPrecision(10, 2)
                .IsRequired();
                
            entity.Property(e => e.Categoria)
                .HasColumnName("categoria")
                .HasMaxLength(100)
                .IsRequired();
                
            entity.Property(e => e.CompraId)
                .HasColumnName("compra_id")
                .IsRequired();
                
            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .IsRequired();
                
            entity.Property(e => e.UpdatedAt)
                .HasColumnName("updated_at")
                .IsRequired();
            
            // Relacionamento
            entity.HasOne<Compra>()
                .WithMany(c => c.Itens)
                .HasForeignKey(e => e.CompraId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
